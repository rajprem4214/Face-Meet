import axios from "axios";
import React, { useState } from "react";
import Navi from "./Navbar";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button } from "react-bootstrap";
import { CircleCheckBig } from "lucide-react";
import Webcam from "react-webcam";

const Joining = () => {

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const webcamRef = React.useRef(null);
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: "user",
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState(false);
    const [userimage, setUserimage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());

    const [formValue, setformValue] = React.useState({
        email: "",
        password: "",
        roomname: "",
        // date: new Date(),
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const isFormIncomplete = Object.values(formValue).some(
        (value) => value === ""
    );

    const handleSubmit = (event) => {
        setShowModal(false)
        event.preventDefault();
        const formData = new FormData();
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
                if (res.status === 200) {
                    toast.success("Congratulations, You are verified!", {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "dark",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setShowModal(true)
                }
            })
            .catch((err) => {
                toast.error("Ahh, You have not registered yet!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const capture = React.useCallback(() => {
        console.log(loading)
        const imageSrc = webcamRef.current.getScreenshot();
        axios
            .post("http://127.0.0.1:5000/api", { data: imageSrc })
            .then((res) => {
                console.log(`response = ${res.data}`);
                if (res.status === 200) {
                    toast.success("Congratulations, You are face verified!", {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "dark",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    window.location.href = "http://localhost:5000/room"
                } else if (res.status === 400) {
                    toast.error("Ahh, Your face is not verified!", {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "dark",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((error) => {
                console.log(`error = ${error}`);
                toast.error("Ahh, Something went wrong!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        setLoading(false);
        console.log(loading)
    }, [webcamRef]);

    return (
        <div className="flex bg-[#1c1f2e]">
            <Sidebar />
            <div className="overflow-auto no-scrollbar p-0 mt-16 h-[calc(100vh-64px)] bg-[#161825] w-[calc(100vw-290px)] overflow-y-auto">
                <section className="">
                    <div className="flex flex-col items-center justify-center mt-1">
                        <h1 className=" text-2xl font-bold text-[#0f78f8] sm:text-3xl">
                            Join your spot!
                        </h1>

                        <p className="mt-1 text-white">
                            Sign In to attend meeting
                        </p>
                    </div>

                    <div className="px-4 py-3 sm:px-0 lg:px-8 ">
                        <div className="flex gap-x-16 gap-y-8 mt-4">
                            <div className="w-[100vw]">
                                <form
                                    className="grid grid-cols-2 gap-3"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="bg-[#1c1f2e] text-white shadow-lg rounded-lg p-8">
                                        <h2 className="text-lg font-bold mb-2">Instructions:</h2>
                                        <ul className="list-disc list-inside text-sm">
                                            <li>This is a login page to join meetings.</li>
                                            <li>Verification happens in 2 phases.</li>
                                            <li>
                                                First phase will be email verification and secondly, face verification.
                                            </li>
                                            <li>
                                                While face-verification, be in good-light room.
                                            </li>
                                            <li>
                                                Don't wear any face mask.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-[#1c1f2e] rounded-lg shadow-lg flex items-center justify-center">
                                        <Calendar className="border rounded-lg shadow-lg " />
                                    </div>
                                    {/* <div className="border shadow-lg rounded-lg p-8">
                                        <label className="not-sr-only" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-md border"
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
                                    </div> */}

                                    <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                                        <label className="not-sr-only text-white" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-md bg-[#252a40] placeholder-[#848b99] text-white"
                                            placeholder="Email address"
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formValue.email}
                                            onChange={handleChange}
                                        />
                                        <p className="mt-2 text-sm text-white flex justify-start items-start">
                                            Welcome! Please provide your email to join the meeting.
                                        </p>
                                    </div>

                                    <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                                        <label className="not-sr-only text-white" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-md bg-[#252a40] placeholder-[#848b99] text-white"
                                            placeholder="Use a strong one"
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formValue.password}
                                            onChange={handleChange}
                                        />
                                        <p className="mt-2 text-sm text-white flex justify-start items-start">
                                            Welcome! Secure your spot with a strong password.
                                        </p>
                                    </div>

                                    <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">
                                        <label className="not-sr-only text-white" htmlFor="roomName">
                                            Meeting Room Name
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-md bg-[#252a40] placeholder-[#848b99] text-white"
                                            placeholder="Video Conference Room Title"
                                            type="text"
                                            id="roomName"
                                            name="roomname"
                                            value={formValue.roomname}
                                            onChange={handleChange}
                                        />
                                        <p className="mt-2 text-sm text-white flex justify-start items-start">
                                            Welcome! Choose a cool name for your meeting room.
                                        </p>
                                    </div>

                                    {/* <div className="border shadow-lg rounded-lg p-8">
                                        <label className="not-sr-only" htmlFor="image">
                                            Your Image
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-md border"
                                            placeholder="User Image"
                                            type="file"
                                            id="image"
                                            onChange={handleImage}
                                        />
                                        <p className="mt-2 text-sm text-white flex justify-start items-start">
                                            Time for your close-up! Upload a clear, front-facing
                                            photo.
                                        </p>
                                    </div> */}

                                    {/* <div className="border shadow-lg rounded-lg p-8">
                                        <label className="not-sr-only" htmlFor="date">
                                            Date
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-md border"
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
                                    </div> */}

                                    <div className="bg-[#1c1f2e] rounded-lg p-8 shadow-lg">

                                        <div className="flex justify-around">
                                            <button
                                                type="submit"
                                                disabled={isFormIncomplete}
                                                className={`inline-block w-full rounded-lg bg-[#0f78f8] px-5 py-3 font-medium text-white sm:w-auto ${isFormIncomplete
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
                                                    setformValue({
                                                        email: "",
                                                        password: "",
                                                        roomname: "",
                                                    });
                                                }}
                                            >
                                                Reset
                                            </button>
                                        </div>


                                        <Modal show={showModal} onHide={handleModalClose} centered className="text-white">
                                            <Modal.Header closeButton className="bg-[#1c1f2e] text-white">
                                                <Modal.Title className="flex items-center justify-center">
                                                    <CircleCheckBig
                                                        style={{ color: "green", marginRight: "10px" }}
                                                    />
                                                    Proceed with Facial Recognition!
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="p-2 flex justify-center items-center flex-col bg-[#161825]">
                                                <p className="text-sm flex mt-0">
                                                    Click snap to get face verified!
                                                </p>
                                                <Webcam
                                                    className="rounded-lg shadow-lg"
                                                    audio={false}
                                                    height={300}
                                                    ref={webcamRef}
                                                    screenshotFormat="image/jpeg"
                                                    width={350}
                                                    videoConstraints={videoConstraints}
                                                />

                                            </Modal.Body>
                                            <Modal.Footer className="bg-[#1c1f2e]">
                                                {
                                                    !loading ? (<Button variant="primary" onClick={() => {
                                                        setLoading(true);
                                                        capture();
                                                    }}>
                                                        Snap
                                                    </Button>) : (
                                                        <div className="spinner-container">
                                                            <div className="loading-spinner"></div>
                                                        </div>
                                                    )
                                                }

                                                <Button variant="secondary" onClick={handleModalClose}>
                                                    Cancel
                                                </Button>
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
    )
}

export default Joining