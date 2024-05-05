import React from 'react'
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    SquarePlus,
    Video,
    Users,
    ScanFace,
    CircleUserRound,
} from "lucide-react";

const HomeCard = () => {
    return (
        <div className='flex justify-evenly text-white'>
            <section
                className=
                'bg-[#f9a80e] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer'
            >
                <div className="flex-center glassmorphism size-12 rounded-[10px]">
                    {/* <Image src={img} alt="meeting" width={27} height={27} /> */}
                    <Video width={30} height={30} />
                </div>

                <a href="http://localhost:5000/room" className='hover:text-black'>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Quick Meets</h1>
                        <p className="text-lg font-normal">Start an instant meeting</p>
                    </div>
                </a>
            </section>

            <section
                className=
                'bg-[#0f78f8] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer'
            >
                <div className="flex-center glassmorphism size-12 rounded-[10px]">
                    {/* <Image src={img} alt="meeting" width={27} height={27} /> */}
                    <ScanFace width={30} height={30} />
                </div>

                <Link to={"/register"} className='hover:text-black'>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Secure Meets</h1>
                        <p className="text-lg font-normal">Face-Verified Meetings</p>
                    </div>
                </Link>
            </section>


            <section
                className=
                'bg-[#830efa] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer'
            >
                <div className="flex-center glassmorphism size-12 rounded-[10px]">
                    {/* <Image src={img} alt="meeting" width={27} height={27} /> */}
                    <SquarePlus width={30} height={30} />
                </div>

                <Link to={"/joining"} className='hover:text-black'>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Join Meets</h1>
                        <p className="text-lg font-normal">Join Verified Meetings</p>
                    </div>
                </Link>
            </section>


            <section
                className=
                'bg-[#23c55e] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer'
            >
                <div className="flex-center glassmorphism size-12 rounded-[10px]">
                    {/* <Image src={img} alt="meeting" width={27} height={27} /> */}
                    <LayoutDashboard width={30} height={30} />
                </div>

                <Link to={"#"} className='hover:text-black'>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Upcoming Meets</h1>
                        <p className="text-lg font-normal">All Meetings List</p>
                    </div>
                </Link>
            </section>


        </div>

    )
}

export default HomeCard