// pages/index.js

import { useState } from "react";
import Modal from "../components/Modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
    window.open(
      "/captcha/verify",
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
    );
  };

  return (
    <div>
      <h1>Next.js Framer Motion TailwindCSS Modal</h1>
      <button
        onClick={handleModalToggle}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Modal Aç
      </button>
      <Modal isOpen={modalOpen} onClose={handleModalToggle} />
    </div>
  );
}
