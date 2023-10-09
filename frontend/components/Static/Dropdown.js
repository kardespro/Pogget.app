import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { backend } from "../../config.ts";
const Dropdown = () => {
  const router = useRouter();
  const [login, setLogin] = useState();
  useEffect(() => {
    let d = window.localStorage.getItem("pogget-auth");
    if (!d) {
      setLogin(false);
    }
    if (d) {
      setLogin(true);
    }
  }, []);
  const handleLogin = () => {
    const github = window.open(
      `${backend}/auth/github`,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
    );
    setTimeout(() => {
      github.close();
      router.reload();
    }, 6000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 bg-gray-900 rounded-3xl py-5 px-5 shadow-lg border-2 border-blue-600 text-white w-64"
    >
      <div className="py-1">
        {login ? (
          <>
            <a href="#" className="block px-4 py-2 text-white h">
              Dashboard
            </a>
            <a href="#" className="block px-4 py-2 text-white ">
              Publish
            </a>
            <a href="#" className="block px-4 py-2 text-red-700 ">
              Logout
            </a>
          </>
        ) : (
          <>
            <a className="text-blue-600 font-extrabbold" onClick={handleLogin}>
              Login
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Dropdown;
