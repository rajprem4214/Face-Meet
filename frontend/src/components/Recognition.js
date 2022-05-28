import React, { useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { Container, Form, Button } from "react-bootstrap";
import Navi from "./Navbar";
import "./Recognition.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WebcamCapture = () => {
  // Toast Message Configuration
  const notify = () =>
    toast.success("Match Found!!", {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // Webcam Configuration
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user",
  };
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  // Image Capture in base64 data
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(`imageSrc = ${imageSrc}`);
    axios
      .post("http://127.0.0.1:5000/api", { data: imageSrc })
      .then((res) => {
        console.log(`response = ${res.data}`);
        setName(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`error = ${error}`);
      });
  }, [webcamRef]);

  // Login form actions
  const [formValue, setformValue] = React.useState({
    username: "",
    email: "",
    password: "",
    roomname: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  // Handle Login Data
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", formValue.username);
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    formData.append("roomname", formValue.roomname);

    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://127.0.0.1:5000/login", formData, header)
      .then((res) => {
        setErrorMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      {/* Navbar  */}
      <Navi />
      <Container>
        {/* Bootstrap Form */}
        <h1>Verify To Join the Meet</h1>

        <div className="form">
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter Your Name"
                  value={formValue.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formValue.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValue.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Room Name:</Form.Label>
                <Form.Control
                  type="roomname"
                  name="roomname"
                  placeholder="Room Name"
                  value={formValue.roomname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  notify();
                }}
              >
                Submit
              </Button>
              {errorMessage ===
                "Match Found!! Please Proceed with facial recognition" && (
                <ToastContainer />
              )}
            </Form>
            <br />
            {errorMessage && (
              <p className="error" style={{ color: "red" }}>
                {" "}
                {errorMessage}{" "}
              </p>
            )}
          </Container>
        </div>
        <br />
        {errorMessage ===
          "Match Found!! Please Proceed with facial recognition" && (
          <div className="form">
            <Container>
              <p>Look at Camera</p>
              {name === "Mismatch" && (
                <h3
                  className="mt-3"
                  style={{ color: "red", marginLeft: "15vw" }}
                >
                  Face Mismatch
                </h3>
              )}

              {/* Webcam Container  */}
              <Webcam
                className="cam"
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
              />
              <br />
              {!loading && (
                <Button
                  className="mt-3 sbtn"
                  onClick={() => {
                    capture();
                    setLoading(true);
                  }}
                >
                  Snap
                </Button>
              )}

              <br />
              {loading && (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              )}
              {name === "Matched" &&
                (window.location.href = "http://127.0.0.1:5000/room")}
            </Container>
          </div>
        )}
      </Container>
    </div>
  );
};

export default WebcamCapture;
