import Dropdown from "../Dropdown";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex w-full justify-center justify-between gap-4 mt-2">
        <div className=" pl-6 pt-2">
          <h1 className="text-blue-600 text-xl font-extrabold">Pogget</h1>
          <div className="">
            <p className="text-gray-300 font-bold text-xs ">by Nego</p>
          </div>
        </div>
        <div className="mx-auto gap-4 flex justify-center justify-between items-center  font-extrabold">
          <p className="text-white text-center pl-4" onClick={() => router.push("/")}>Home</p>
          <p className="text-white text-center" onClick={() => router.push("/search")}>Search</p>
          <p className="text-white text-center" onClick={() => router.push("/")}>Plugins</p>
        </div>
        <div className="flex ">
          <button
            className="bg-gray-900 rounded-3xl py-5 px-5"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="pt-12">{isOpen && <Dropdown />}</div>
    </>
  );
}
