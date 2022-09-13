
# Face Meet 

Are anonymous interruptions in your video meeting driving you crazy? Do you need a security solution that lets real people attend your meeting?

Do not worry; we have you covered. We now present **Face Meet**.  
 
A GenZ video calling platform called **Face Meet** provides 2FA (Two Factor Authentication), which consists of **face recognition** and **email password verification** technology. Only those who have registered are allowed to join meetings after a successful image verification.

Therefore, before setting up a meet, a user must register on our site with an email address, a password, and a photo. Users who want to attend the meeting must complete the registration process as well. To ensure that a real individual really attended the meet, a face verification is done after registration.

Build with help of **Face Recognition Library** in Python, it gives an accuracy of **99.38%.**  

Want to host or join a meet, just register and you are good to go.

## Demo

[Video Link](https://youtu.be/DrJIoRPJRB0)


## Meet Glance


<img src="https://i.ibb.co/N1C2q8c/HomePage.png" alt="HomePage" border="0" >

|      Register Page       |       Login Page        |
| :---------------------: | :----------------------: |
| <img src="https://i.ibb.co/2thThWB/Register.png" alt="Register" border="0" width=400> | <img src="https://i.ibb.co/8MGBTn5/login.png" alt="login" border="0" width=400> |

|      Face Verification       |   Video Meet   |
| :--------------------: | :---------------------: |
| <img src="https://i.ibb.co/hdmtPfq/Faa.png" alt="Faa" border="0" width=400> | <img src="https://i.ibb.co/xSTzc1v/meet.png" alt="meet" border="0" width=400> |

## Table of Contents
  
  - [Features](#features)
  - [TechStack](#techstack)
  - [Installation](#installation)
  - [Appendix](#appendix)
  - [APIReference](#apireference)
  - [Documentation](#documentation)
  - [Optimizations](#optimizations)
## Features

- **Video conferencing**
  - Hassle free group calls
  - Total capacity of 50+ users.
  - In Meet messaging
  - Screen Sharing
- **Security Control (X-factor / Flagship)**
  - 2FA with Email Verification and Face Recogniton.
  
- **Cloud Storage**
  - Implemented cloud storage for data, no need for local DB.
  - Grid FS for storing large size image.
  
- **PWA**
  - **Download** and add to homescreen/desktop for ease of access.
  - Smooth installation, native-like behaviour and access to device hardware.
  
- **Authentication**
  - Login using gmail account.
  - Auth check in meet to **prevent unauthorized** users from entering.




## TechStack

![Key Technologies Used](https://user-images.githubusercontent.com/85401522/170822301-510d4ab1-0081-4f8c-b6ef-f3c8812c8f3b.png)

1. Front End / Client Side
    - ReactJS 
    - Bootstrap - CSS and other components
    - React Webcam - Capture User's Image

2. BackEnd Server:
   - For Face Recognition
     - Face Recognition Library - calculate encodings
     - Open CV - Compare Image on basis of encodings.
   
   - For video calling
      - Twilio Video API - Create Real-Time Video App
      - Twilio Cloud - Connect room participants.

3. Data Management (Databases): 
    - MongoDB Atlas - Data management and user details
    - Grid FS - Storing image with base64 data.
## Installation


### Pre-Requisites:
1. Install Git Version Control
[ https://git-scm.com/ ]

2. Install Python Latest Version
[ https://www.python.org/downloads/ ]

3. Install Pip (Package Manager)
[ https://pip.pypa.io/en/stable/installing/ ]

4. Install MongoDB Compass and connect it to localhost **27017** [ Atlas Connection is quite slow and may not work everytime ]
- Uncomment the following code in app.py to change the connection as per requirement.

  <img src="https://user-images.githubusercontent.com/85401522/183743315-a766d3a9-f7ff-4797-a162-68849f134134.png" alt="Faa" border="0" width=400>




### Clone the project:

```bash
  git clone https://github.com/rajprem4214/Face-Meet.git
```

Go to the project directory

```bash
  cd Face-Meet
```

**Backend Server:**

Go to backend folder

```bash
  cd backend
```
#### Create a Virtual Environment and Activate:

Install Virtual Environment

```bash
  pip install virtualenv
```

Create Virtual Environment:


```bash
  virtualenv venv
```

Go to venv folder and Activate virtual enviroment

```bash
  cd venv
```
Run the following command
```bash
  .\Scripts\activate.ps1
```
Go back to backend folder
```bash
  cd ..
```
Install Requirements from 'requirements.txt'
```bash
  pip install -r requirements.txt
```

Start the backend server

```bash
 flask run
```

**Frontend Server:**

Go to frontend folder

```bash
 cd frontend
```

Install all dependencies

```bash
 npm install
```
Start frontend server

```bash
 npm run start
```

#### Local Url for Server:

- Frontend is running on http://localhost:3000 
- Backend is running on http://127.0.0.1:5000 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
TWILIO_ACCOUNT_SID=AC612f9ab098d697e6d572725234130052
TWILIO_API_KEY_SID=SKf1a116bd7f1c50a6e6988e875c9b85a2
TWILIO_API_KEY_SECRET=YPe9sOZP25xzUxnMd6xLXBKfigNmTJRC
```


## Appendix


### MongoDB Cloud Credentials:

```
Database Name: images
Collections Name: image
```


## APIReference

#### Verify User Image:

```http
  POST /api
```

#### Register User:

```http
 GET POST /create
```

#### Create or join room:

```http
  POST /join-room
```



## Documentation

[PPT Documentation](https://1drv.ms/p/s!AhTIcIxUOCw5gyXOWfkauH9saktA?e=gUVzT3)

<img src="https://i.ibb.co/1z41N4b/regppt.png" alt="regppt" border="0">

<img src="https://i.ibb.co/wc4nZXD/logppt.png" alt="logppt" border="0">

<img src="https://i.ibb.co/t3JYwNk/twilppt.png" alt="twilppt" border="0">


## Optimizations

- Reduced time in image encoding by not taking encodings of whole image DB.
- Instead, retrieve image id during login and match that particular image with cam image.


## Future Aspects

- Add user id in URLs for each user for more authentication.
- Store image in IPFS distributed storage for privacy concerns.
## Authors

- [Prem Raj](https://www.github.com/rajprem4214)

