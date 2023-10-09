import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Static/Header";
import Bar from "../components/Static/Bar";
//import BottomBar from '../components/Static/BottomBar'
import Navbar from "../components/Static/Navbar";
import DesktopNavbar from "../components/Static/Desktop/Navbar";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"; 
import PropTypes from 'prop-types'; 
declare global {
  interface Window {
    __POGGET?: string;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);
  const customValue = "__POGGET";

  // window nesnesine özel değeri ekle
  if (typeof window !== "undefined") {
    window.__POGGET = "true"
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Header />
      <Bar />
      {isMobile ? <Navbar /> : <DesktopNavbar />}
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
