import React from "react";
import Navi from "./Navbar";
import "./Dashboard.css";
import Lottie from "lottie-react";
import animationData from "./lotties/facescan.json";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <Navi /> 
      <div
        className="sample"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="intro">
          <p data-aos="fade-up" className="Name">
            Face Meet
          </p>
          <p data-aos="fade-up" style={{}} className="quote1">
            Your meet is secure with us.
          </p>
          <p className="tagline">
            Register to Host or Join a Meet.
            <br />
            Login to join your meet.
          </p>
          <Link to="/register">
            {" "}
            <Button className="rbtn">Register For Meet</Button>
          </Link>
          <Link to="/recognition">
            <Button className="lbtn">Join The Meet</Button>
          </Link>
        </div>
        <div data-aos="fade-down" className="scontact">
          <Lottie
            className="lottie"
            animationData={animationData}
            autoplay={true}
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
