import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import axios from "axios";
import { backend } from "../../config.ts";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenn, setIsOpenn] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({});
  const toggleMenu = () => {
    setIsOpenn(!isOpenn);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    (async () => {
      let w = window.localStorage.getItem("pogget-auth");
      if (!w) {
        setUser(null);
      }
      if (w) {
        let w1 = JSON.parse(w);
        let d = await axios.get(`${backend}/api/users/@me`, {
          headers: { Authorization: `Basic ${w1.token}` },
        });
        setUser(d.data);
      }
    })();
  }, []);
  return (
    <>
      <div className="flex space-x-2 pt-4">
        <div className="pl-6 pt-2">
          <h1 className="text-blue-600 text-xl font-extrabold">Pogget</h1>
          <div className="">
            <p className="text-gray-300 font-bold text-xs ">by Nego</p>
          </div>
        </div>
        <div className="flex space-x-2 pl-44 pr-2">
          <div className="userBTN">
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

          <div className="Menu">
            <button
              className="bg-gray-900 rounded-3xl py-5 px-5"
              onClick={toggleMenu}
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && <Dropdown />}
      {isOpenn && (
        <nav className="fixed top-0 left-0 w-screen h-screen  bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="flex flex-col justify-center items-center space-y-6 text-white text-2xl w-screen h-screen "
            initial={{ opacity: 0, backdropFilter: "blur(0)" }}
            animate={{
              opacity: isOpenn ? 1 : 0,
              backdropFilter: isOpenn ? "blur(10px)" : "blur(0)",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="pt-64  justify-center items-center h-screen font-bold">
              <p className="font-bold" onClick={() => router.push("/")}>
                Home
              </p>
              <p className="font-bold" onClick={() => router.push("/search")}>
                Search
              </p>
              <p className="font-bold">Documentation</p>
              {user ? (
                <>
                  <p className="text-blue-600 font-extrabold">Dashboard</p>
                </>
              ) : (
                <>
                  <p className="text-blue-600 font-extrabold">Login</p>
                </>
              )}
            </div>
          </motion.div>

          <button
            className="fixed bg-blue-600 top-4 right-4 bg-blue-600 text-white p-2 rounded-3xl py-5 px-5 "
            onClick={toggleMenu}
          >
            {isOpenn ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              "Open Menu"
            )}
          </button>
        </nav>
      )}
    </>
  );
}
