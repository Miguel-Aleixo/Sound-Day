import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export function RedesSociais() {
    return (
        <div className="flex gap-4 mt-4">
            <button className="group bg-gray-800 hover:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer">
                <FaInstagram className="w-5 h-5 group-hover:text-blue-500 transition-all duration-300" />
            </button>
            <button className="group bg-gray-800 hover:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer">
                <FaXTwitter className="w-5 h-5 group-hover:text-blue-500 transition-all duration-300" />
            </button>
            <button className="group bg-gray-800 hover:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer">
                <FiYoutube className="w-5 h-5 group-hover:text-blue-500 transition-all duration-300" />
            </button>
        </div>
    )
}