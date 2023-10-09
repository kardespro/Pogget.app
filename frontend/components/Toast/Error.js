import { motion } from 'framer-motion';

const Toast = ({ message }) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            transition={{duration: 0.3}}
            className="fixed bottom-4 right-4 bg-red-600 py-5 px-5 text-white rounded-full p-2 cursor-pointer-none">
            <p className="flex space-x-2">
                <span className="rounded-full bg-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </span>
                <span className="font-bold">{message}</span>
            </p>
        </motion.div>
    );
};

export default Toast;
