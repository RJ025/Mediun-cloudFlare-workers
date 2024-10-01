import { FaMedium } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Avatar } from "./BlogCard";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div className="grid grid-flow-col p-4 bg-gradient-to-r from-blue-400 to-blue-600 shadow-md items-center">
            {/* Logo Section */}
            <Link to={'/blogs'}>
                <div className="text-4xl flex justify-center items-center text-white">
                    <FaMedium />
                </div>
            </Link>
            

            {/* Search Bar Section */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-full max-w-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
            </div>

            {/* Right Side Icons */}
            <div className="flex justify-end items-center gap-6">
                {/* Write Button */}
                <Link to={'/publish'}>
                    <button className="flex items-center space-x-2 text-lg text-white hover:text-blue-200 transition duration-200">
                        <HiOutlinePencilSquare className="text-2xl" />
                        <span>Write</span>
                    </button>
                </Link>
                

                {/* Notification Icon */}
                <div className="text-3xl text-white hover:text-blue-200 transition duration-200">
                    <IoMdNotificationsOutline />
                </div>

                {/* Avatar */}
                <div>
                    <Avatar name="Ritik Jain" />
                </div>
            </div>
        </div>
    );
};
