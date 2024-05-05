import React from "react";
import Navi from "./Navbar";
// import "./Dashboard.css";
import Lottie from "lottie-react";
import animationData from "./lotties/facescan.json";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Hero from "./Hero";

const Dashboard = () => {
  return (
    //<div>
    //   {/* Navbar */}
    //   <Navi />
    //   <div
    //     className="sample"
    //     style={{ display: "flex", justifyContent: "space-between" }}
    //   >
    //     <div className="intro">
    //       <p data-aos="fade-up" className="text-6xl">
    //         Face Meet
    //       </p>
    //       <p data-aos="fade-up" style={{}} className="quote1">
    //         Your meet is secure with us.
    //       </p>
    //       <p className="tagline">
    //         Register to Host or Join a Meet.
    //         <br />
    //         Login to join your meet.
    //       </p>
    //       <Link to="/register">
    //         {" "}
    //         <Button className="rbtn">Register For Meet</Button>
    //       </Link>
    //       <Link to="/recognition">
    //         <Button className="lbtn">Join The Meet</Button>
    //       </Link>
    //     </div>
    //     <div data-aos="fade-down" className="scontact">
    //       <Lottie
    //         className="lottie"
    //         animationData={animationData}
    //         autoplay={true}
    //         loop={true}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="flex bg-[#1c1f2e]">
      <Sidebar />
      <div className="overflow-auto no-scrollbar p-4 mt-16 h-[calc(100vh-64px)] bg-[#161825] overflow-y-auto">
        <Hero />
      </div>
    </div>
  );
};

export default Dashboard;
