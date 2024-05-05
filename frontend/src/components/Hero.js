import React from "react";
import HomeCard from "./HomeCard";

const Hero = () => {

  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <>
      <section className="w-[75vw]">
        <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover text-white">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            <h2 className="glassmorphism max-w-[273px] border text-white rounded py-2 text-center text-base font-normal">
              Upcoming Meeting at: 12:30 PM
            </h2>
            <div className="flex flex-col gap-2 justify-start items-start">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <HomeCard />
        </div>
        <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 overflow-hidden">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            <div className="mx-auto max-w-lg lg:mx-0 ">
              <h2 className="text-3xl font-bold sm:text-4xl text-white">
                Welcome To Face Meet
              </h2>

              <p className="mt-4 text-white">
                Experience seamless video calling enhanced with face recognition
                technology for added security.
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-md font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <p
                  className="flex flex-col items-start rounded-xl bg-[#1c1f2e] p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  href="#"
                >
                  <h2 className="font-bold text-white">Video Calls</h2>
                  <p className="sm:text-sm sm:text-white">
                    Start or join high-quality video calls with just a click.
                  </p>
                </p>
              </div>

              <p
                className="flex flex-col items-start rounded-xl  bg-[#1c1f2e] p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <h2 className="font-bold text-white">Face Recognition</h2>
                <p className="sm:text-sm sm:text-white">
                  Enhance your security with our advanced face recognition
                  feature.
                </p>
              </p>

              <p
                className="flex flex-col items-start rounded-xl bg-[#1c1f2e] p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
              >
                <h2 className="font-bold text-white">Secure Authentication</h2>
                <p className="sm:text-sm sm:text-white">
                  Our two-factor authentication ensures that only legitimate
                  users can.
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
