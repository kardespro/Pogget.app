// components/Modal.js

import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{opacity: 0, backdropFilter: 'blur(0)'}}
                        animate={{opacity: isOpen ? 1 : 0, backdropFilter: isOpen ? 'blur(10px)' : 'blur(0)'}}
                        transition={{duration: 0.5, ease: 'easeInOut'}}
      className={`w-full fixed inset-0 flex items-center justify-center ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-3xl py-5 px-5 w-full h-full">


        
        <button onClick={onClose} className="mt-4 px-5 py-5 rounded-3xl bg-blue-600 text-white rounded-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
