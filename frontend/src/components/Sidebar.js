import {
  LayoutDashboard,
  SquarePlus,
  Video,
  Users,
  CircleUserRound,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { LayoutDashboard } from "lucide-react";

const Sidebar = () => {

  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <>
      {/* <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      > */}
      <div className="flex h-screen flex-col justify-between  bg-[#1c1f2e] text-white">
        <div className="px-4 py-6">

          <div class="flex items-center gap-x-2">
            <img
              src="/assets/logo.svg"
              alt="logo"
              height={50}
              width={50}
            />
            <span class="font-bold text-2xl">Face Meet</span>
          </div>

          <ul className="mt-6 space-y-5">
            <li className="">
              <Link to={"/"}
                onClick={() => setActiveMenu("dashboard")}
                className={`block rounded-lg ${activeMenu === "dashboard" ? 'bg-[#0E78F9]' : ''} px-4 py-2 text-md font-medium text-white`}>
                <span className="flex gap-2">
                  <LayoutDashboard />
                  Dashboard
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/register"}
                onClick={() => setActiveMenu("hostMeeting")}
                className={`block rounded-lg ${activeMenu === "hostMeeting" ? 'bg-[#0E78F9]' : ''} hover:bg-[#0E78F9] px-4 py-2 text-md font-medium text-white`}
              >
                <span className="flex gap-2">
                  <Video />
                  Host a Meeting
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/joining"}
                onClick={() => setActiveMenu("joinMeeting")}
                className={`block rounded-lg ${activeMenu === "joinMeeting" ? 'bg-[#0E78F9]' : ''} hover:bg-[#0E78F9] px-4 py-2 text-md font-medium text-white`}
              >
                <span className="flex gap-2">
                  <SquarePlus />
                  Join a Meeting
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/meetings"}
                onClick={() => setActiveMenu("meetings")}
                className={`block rounded-lg ${activeMenu === "meetings" ? 'bg-[#0E78F9]' : ''} hover:bg-[#0E78F9] px-4 py-2 text-md font-medium text-white`}
              >
                <span className="flex gap-2">
                  <Users />
                  Meetings
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={"/accounts"}
                onClick={() => setActiveMenu("account")}
                className={`block rounded-lg ${activeMenu === "account" ? 'bg-[#0E78F9]' : ''} hover:bg-[#0E78F9] px-4 py-2 text-md font-medium text-white`}
              >
                <span className="flex gap-2">
                  <CircleUserRound /> Account
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs gap-1">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div> */}
      </div>
      {/* </aside> */}
    </>
  );
};

export default Sidebar;
