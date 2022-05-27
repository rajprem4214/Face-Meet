import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Navi from "./Navbar";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  // Toast Message
  const notify = () =>
    toast.success("You have sucessfully registered!", {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //Form Data
  const [formValue, setformValue] = React.useState({
    username: "",
    email: "",
    password: "",
    roomname: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const [userimage, setUserimage] = useState(undefined);

  //Handle Submit '/create' API Call
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", formValue.username);
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    formData.append("roomname", formValue.roomname);
    formData.append("userimage", userimage);

    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://127.0.0.1:5000/create", formData, header)
      .then((res) => {
        setSucessMessage("yes");
        setErrorMessage(res.data);
      })
      .catch((err) => {
        setErrorMessage("Invalid Credentials !!! Please reload page!!");
      });
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = (event) => {
    setUserimage(event.target.files[0]);
  };

  return (
    <div>
      {/* Navbar  */}
      <Navi />
      <h1>Register To Host Or Join the Meet</h1>
      <div className="form">
        <Container>
          {/* Bootstrap Form */}
          <Form onSubmit={handleSubmit} size="sm">
            <Form.Group className="mb-3 mt-3 sm">
              {errorMessage !== "Uploaded" && (
                <p className="error" style={{ color: "red" }}>
                  {" "}
                  {errorMessage}{" "}
                </p>
              )}
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                className="sm"
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
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                label="Enter your image"
                onChange={handleImage}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={notify}>
              Submit
            </Button>
            {sucessMessage && errorMessage === "Uploaded" && (
              <Link to="/recognition">
                <Button className="mx-3">Join Meet</Button>
              </Link>
            )}
            {/* Toast Container  */}
            {errorMessage === "Uploaded" && <ToastContainer />}
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Register;
