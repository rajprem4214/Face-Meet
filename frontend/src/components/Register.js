import axios from "axios";
import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import Navi from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button } from "react-bootstrap";
import { CircleCheckBig } from "lucide-react";

const Register = () => {
  // Toast Message
  const notify = () => {
    toast.success("You have sucessfully registered!", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [formValue, setFormValue] = React.useState({
    username: "",
    email: "",
    password: "",
    roomname: "",
    // date: new Date(),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState(false);
  const [userimage, setUserimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const isFormIncomplete = Object.values(formValue).some(
    (value) => value === ""
  );

  const handleSubmit = (event) => {
    setLoading(true);
    setSucessMessage(false);
    setErrorMessage(false);
    setShowModal(false);
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", formValue.username);
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    formData.append("roomname", formValue.roomname);
    formData.append("userimage", userimage);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://127.0.0.1:5000/create", formData, header)
      .then((res) => {
        if (res.status === 200) {
          toast.success("You have sucessfully registered!", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShowModal(true);
        } else if (res.status === 201) {
          toast.error("You have already registered!", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        // setErrorMessage(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setLoading(false);
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormValue({
      ...formValue,
      date: date,
    });
  };

  const handleImage = (event) => {
    setUserimage(event.target.files[0]);
  };

  return (
    <div className="flex bg-[#1c1f2e]">
      <Sidebar />
      <div className="overflow-auto no-scrollbar p-0 mt-16 h-[calc(100vh-64px)] bg-[#161825] w-[calc(100vw-290px)] overflow-y-auto">
        <section className="">
          <div className="flex flex-col items-center justify-center mt-1">
            <h1 className=" text-2xl font-bold text-[#0f78f8] sm:text-3xl">
              Secure your spot!
            </h1>

            <p className="mt-1  text-white">Sign Up for Meeting Access</p>
          </div>
          <div className="px-4 py-3 sm:px-0 lg:px-8 ">
            <div className="flex gap-x-16 gap-y-8 mt-4">
              <div className="">
                <form
                  className="grid grid-cols-2 gap-3"
                  onSubmit={handleSubmit}
                >
                  <div className="text-white rounded-lg shadow-lg p-8 bg-[#1c1f2e]">
                    <h2 className="text-lg font-bold mb-2">Instructions:</h2>
                    <ul className="list-disc list-inside text-sm">
                      <li>You can use Calendar for your preference.</li>
                      <li>Please enter your full name.</li>
                      <li>
                        Enter a valid email address. This will be used for all
                        communication and cannot be changed later.
                      </li>
                      <li>
                        Your password should be at least 8 characters long and
                        include a mix of letters, numbers, and special
                        characters.
                      </li>
                      <li>
                        Choose a unique name for your meeting room. This will be
                        used to identify your room in the system.
                      </li>
                      <li>
                        Upload a clear, front-facing photo. This will be used as
                        for face recognition.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#1c1f2e] rounded-lg shadow-lg flex items-center justify-center">
                    <Calendar className="border rounded-lg shadow-lg " />
                  </div>
                  <div className="bg-[#1c1f2e] rounded-lg shadow-lg p-8">
                    <label className="not-sr-only text-white" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-full bg-[#252a40] placeholder-[#848b99] text-white rounded-lg border-gray-200 p-3 text-md"
                      placeholder="Full Name"
                      type="text"
                      id="name"
                      name="username"
                      value={formValue.username}
                      onChange={handleChange}
                    />
                    <p className="mt-2 text-sm text-white flex justify-start items-start">
                      What's your superhero name?
                    </p>
                  </div>

                  <div className="rounded-lg p-8 bg-[#1c1f2e] shadow-lg">
                    <label className="not-sr-only text-white" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full bg-[#252a40] placeholder-[#848b99] text-white rounded-lg border-gray-200 p-3 text-md"
                      placeholder="Email address"
                      type="email"
                      id="email"
                      name="email"
                      value={formValue.email}
                      onChange={handleChange}
                    />
                    <p className="mt-2 text-sm text-white flex justify-start items-start">
                      We promise not to send you any spam, just the good stuff.
                    </p>
                  </div>

                  <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                    <label
                      className="not-sr-only text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full bg-[#252a40] placeholder-[#848b99] text-white rounded-lg border-gray-200 p-3 text-md"
                      placeholder="Use a strong one"
                      type="password"
                      id="password"
                      name="password"
                      value={formValue.password}
                      onChange={handleChange}
                    />
                    <p className="mt-2 text-sm text-white flex justify-start items-start">
                      Create a password stronger than a cup of coffee on a
                      Monday morning.
                    </p>
                  </div>

                  <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                    <label
                      className="not-sr-only text-white"
                      htmlFor="roomName"
                    >
                      Meeting Room Name
                    </label>
                    <input
                      className="w-full bg-[#252a40] placeholder-[#848b99] text-white rounded-lg border-gray-200 p-3 text-md"
                      placeholder="Video Conference Room Title"
                      type="text"
                      id="roomName"
                      name="roomname"
                      value={formValue.roomname}
                      onChange={handleChange}
                    />
                    <p className="mt-2 text-sm text-white flex justify-start items-start">
                      Give your meeting room a cool name. "The Batcave", maybe?
                    </p>
                  </div>

                  <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                    <label className="not-sr-only text-white" htmlFor="image">
                      Your Image
                    </label>
                    <input
                      className="w-full bg-[#252a40] placeholder-[#848b99] text-white rounded-lg border-gray-200 p-3 text-md"
                      placeholder="User Image"
                      type="file"
                      id="image"
                      onChange={handleImage}
                    />
                    <p className="mt-2 text-sm text-white flex justify-start items-start">
                      Time for your close-up! Upload a clear, front-facing
                      photo.
                    </p>
                  </div>

                  <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                    <label className="not-sr-only text-white" htmlFor="date">
                      Date
                    </label>
                    <input
                      className="w-full bg-[#252a40] placeholder-[#848b99] text-white rounded-lg border-gray-200 p-3 text-md"
                      placeholder="Select Date"
                      type="date"
                      id="date"
                      name="date"
                      value={formValue.date}
                      onChange={handleDateChange}
                    />
                    <p className="mt-2 text-sm text-white flex justify-start items-start">
                      Don't forget to water your plants on this day! 🌱📅
                    </p>
                  </div>

                  <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                    {!loading && (
                      <div className="flex justify-around">
                        <button
                          type="submit"
                          disabled={isFormIncomplete || !userimage}
                          className={`inline-block w-full rounded-lg bg-[#0f78f8] px-5 py-3 font-medium text-white sm:w-auto ${
                            isFormIncomplete || !userimage
                              ? "disabled opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          Submit
                        </button>

                        <button
                          type="button"
                          className="inline-block w-full rounded-lg bg-[#0f78f8] px-5 py-3 font-medium text-white sm:w-auto"
                          onClick={() => {
                            setFormValue({
                              username: "",
                              email: "",
                              password: "",
                              roomname: "",
                            });
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    )}

                    {loading && (
                      <div className="spinner-container">
                        <div className="loading-spinner"></div>
                      </div>
                    )}
                    {/* {sucessMessage && errorMessage === "Uploaded" && (
                      <Link to="/recognition">
                        <Button className="mx-3">Join Meet</Button>
                      </Link>
                    )} */}

                    <Modal show={showModal} onHide={handleModalClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title className="flex items-center justify-center">
                          <CircleCheckBig
                            style={{ color: "green", marginRight: "10px" }}
                          />
                          Registration Successful!
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="border shadow-lg rounded-lg p-8 flex justify-center items-center">
                        You have successfully registered for your meeting!
                        <br />
                        Feel free to join now or fashionably late - the choice
                        is yours!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                          Cancel
                        </Button>
                        <Link to={"/joining"}>
                          <Button variant="primary">Join Meeting</Button>
                        </Link>
                      </Modal.Footer>
                    </Modal>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
