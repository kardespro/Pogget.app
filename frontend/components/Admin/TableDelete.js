import axios from "axios";
import { backend, admin_key } from "../../config.ts";
import Modal from "./Views/Modal";
import { useState } from "react";
import { DeletePlugin } from "../../functions/Admin/IAdmin.ts";
export default function Table({ data }) {
  function h(id) {
    DeletePlugin(id).then((a) => alert('ss'));
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
                  onClick={() => DeletePlugin(item._id)}
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
