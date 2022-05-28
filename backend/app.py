# all imports
from fileinput import filename
import uuid  # for generating random user id values
from flask import Flask, jsonify, request, render_template, abort
from flask_cors import CORS
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant, ChatGrant
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import twilio.jwt.access_token
import twilio.jwt.access_token.grants
import twilio.rest
from dotenv import load_dotenv
from pymongo import MongoClient
import gridfs
from face_rec import recognize_faces
from PIL import Image
import base64
import io
import os
import shutil
import time
from flask_pymongo import PyMongo
import gridfs
import codecs

# Load environment variables from a .env file
load_dotenv()

# Create a Twilio client
twilio_account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
twilio_api_key_sid = os.environ.get('TWILIO_API_KEY_SID')
twilio_api_key_secret = os.environ.get('TWILIO_API_KEY_SECRET')
twilio_client = Client(twilio_api_key_sid, twilio_api_key_secret,
                       twilio_account_sid)

# Flask Initialisation
app = Flask(__name__)
CORS(app)


# Database Connection
# MongoDB Cloud Connection
connection = MongoClient(
    "mongodb+srv://rajprem4214:1234@engage.exwwucz.mongodb.net/?retryWrites=true&w=majority")
# connection = MongoClient("localhost", 27017)# MongoDB Local Database Connection
database = connection['images']
collec = database['image']
fs = gridfs.GridFS(database)


# Twilio find or create a room
def find_or_create_room(room_name):
    try:
        # try to fetch an in-progress room with this name
        twilio_client.video.rooms(room_name).fetch()
    except twilio.base.exceptions.TwilioRestException:
        # the room did not exist, so create it
        twilio_client.video.rooms.create(unique_name=room_name, type="group")


# Initialise a chatroom for each room
def get_chatroom(name):
    for conversation in twilio_client.conversations.conversations.stream():
        if conversation.friendly_name == name:
            return conversation

    # a conversation with the given name does not exist ==> create a new one
    return twilio_client.conversations.conversations.create(
        friendly_name=name)


# Video call home page
@app.route("/room")
def serve_homepage():
    return render_template("video.html")


# Register route
@app.route('/create', methods=['POST', 'GET'])
def create():
    if not request.form.get('username') or not request.form.get('email') or not request.form.get('password') or not request.form.get('roomname'):
        return 'Fill Form Properly'
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    roomname = request.form.get('roomname')
    userimage = request.files['userimage']
    id = fs.put(userimage, filename="user_image")
    query = {
        'image_id': id,
        'username': username,
        'email': email,
        'password': password,
        'roomname': roomname
    }
    if database.image.find_one({"username": query['username'], "email": query['email'], "password": query['password'], "roomname": query['roomname']}):
        return 'Already registered!'
    status = collec.insert_one(query)
    if(status):
        return 'Uploaded'
    return jsonify({'result': 'Error occured '}), 500


# Login Route
@app.route("/login", methods=['POST'])
def login():
    if not request.form.get('username') or not request.form.get('email') or not request.form.get('password') or not request.form.get('roomname'):
        return 'Data Cannot Be Empty'
    user = database.image.find_one({
        "username": request.form.get('username'),
        "email": request.form.get('email'),
        "password": request.form.get('password'),
        "roomname": request.form.get('roomname')
    })
    global image_id
    if user and request.form.get('password') == user['password'] and request.form.get('roomname') == user['roomname']:
        res = 'Match Found!! Please Proceed with facial recognition'
        image_id = user['image_id']
        return res
    return 'You are not registered for this event'


# Join Room API Call
@app.route('/join-room', methods=['POST'])
def joinroom():
    username = request.get_json(force=True).get('username')
    roomname = request.get_json(force=True).get('roomname')
    if not username:
        abort(401)
    conversation = get_chatroom(roomname)
    find_or_create_room(roomname)
    try:
        conversation.participants.create(identity=username)
    except TwilioRestException as exc:
        # do not error if the user is already in the conversation
        if exc.status != 409:
            raise
    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(VideoGrant(room=roomname))
    token.add_grant(ChatGrant(service_sid=conversation.chat_service_sid))
    return {'token': token.to_jwt(),
            'conversation_sid': conversation.sid}


# Image Verification API Call
@app.route('/api', methods=['POST', 'GET'])
def api():
    user_image = fs.get(image_id)
    base64_data = codecs.encode(user_image.read(), 'base64')
    user_image = base64_data.decode('utf-8')
    load_user = Image.open(io.BytesIO(base64.b64decode(user_image)))
    data = request.get_json()
    resp = 'Nobody'
    directory = './stranger'
    user_dir = './known_people'
    if data:
        if os.path.exists(directory):
            shutil.rmtree(directory)
            shutil.rmtree(user_dir)

        if not os.path.exists(directory):
            try:
                os.mkdir(directory)
                os.mkdir(user_dir)
                time.sleep(1)
                result = data['data']
                b = bytes(result, 'utf-8')
                image = b[b.find(b'/9'):]
                im = Image.open(io.BytesIO(base64.b64decode(image)))
                im.save(directory+'/stranger.jpeg')
                load_user.save(user_dir+'/known.jpeg')
                if recognize_faces() == 'Matched':
                    resp = 'Matched'
                else:
                    resp = 'Mismatch'
            except:
                pass
    return resp


if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5000)
