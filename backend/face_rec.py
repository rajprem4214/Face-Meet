import face_recognition
import numpy as np
import cv2


def recognize_faces():

    known_person_path_file = './known_people/known.jpeg'  # Known Image Path
    unknown_person_path_file = './stranger/stranger.jpeg'  # Unknown Image Path

    known_img = cv2.imread(known_person_path_file)
    known_img1 = cv2.cvtColor(known_img, cv2.COLOR_BGR2RGB)
    # Find Encodings
    known_img_encoding = face_recognition.face_encodings(known_img1)[0]
    known_img_encodings = [known_img_encoding]

    unknown_img = cv2.imread(unknown_person_path_file)
    unknown_img1 = cv2.cvtColor(unknown_img, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(unknown_img)
    unknown_img_encoding = face_recognition.face_encodings(
        unknown_img1, face_locations)

    # Comparing Both Images
    for (top, right, bottom, left), face_encoding in zip(face_locations, unknown_img_encoding):
        matches = face_recognition.compare_faces(
            known_img_encodings, face_encoding)

        face_distances = face_recognition.face_distance(
            known_img_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            return 'Matched'
        else:
            return 'Mismatch'
