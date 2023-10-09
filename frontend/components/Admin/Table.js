import axios from "axios";
import {
  backend,
  admin_key,
  endpoint_admin_approve_plugins,
} from "../../config.ts";
import Modal from "./Views/Modal";
import { useState } from "react";
export default function Table({ data, socket }) {
  function h(id) {
    let datam = axios
      .post(`${backend}${endpoint_admin_approve_plugins}?id=${id}`, {
        headers: { Authorization: `Admin ${admin_key}` },
      })
      .then((a) => {
        alert("Plugin Successful Approved");
      });
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [idd, setIDD] = useState("");
  const handleModalToggle = (iddd) => {
    setIDD(iddd);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <>
            <div
              className="hover:border-solid hover:border-blue-600 hover:rounded-3xl pt-4 flex space-x-2 gap-4 outline-none"
              key={index}
              onClick={() => handleModalToggle(item._id)}
            >
              <div className="flex space-x-2">
                <div>
                  <img
                    className="w-12 h-12  rounded-3xl py-1 px-1 bg-gray-900 -mt-2"
                    src={item.iconURL}
                  />
                </div>
                <div className="pl-4 -mt">
                  <h1 className="text-slate-100 text-xs font-bold">
                    {item.title}
                  </h1>
                  <p className="text-gray-400 font-bold text-xs">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex text-xs ">
                <button
                  className="bg-blue-600 py-5 px-5 rounded-3xl text-xs"
                  onClick={() => h(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        );
      })}
      <Modal isOpen={modalOpen} onClose={handleModalToggle} id={idd} />
    </>
  );
}
