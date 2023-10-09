import axios from "axios";
import { useState, useEffect } from "react";
import { backend } from "../../config";

export default function Verify() {
  const [code, setCode] = useState();
  useEffect(() => {
    (async () => {
      let parseTokenFromStorage = JSON.parse(
        window.localStorage.getItem("pogget-auth")
      );
      let getCpSession = await axios.get(
        `${backend}/prevo/guards/blocked-verify?userToken=${parseTokenFromStorage.token}`,
        { mode: "CORS", timeout: 5000 }
      );
      setCode(getCpSession.data.captchaCode);
    })();
  }, []);
  const handleVerificationProggress = async (e) => {
    e.preventDefault();
    let parseTokenFromStorage = JSON.parse(
      window.localStorage.getItem("pogget-auth")
    );
    if (e.target.code.value !== code) {
      console.error("InCorrect");
    }
    if (e.target.code.value === code) {
      window.localStorage.setItem("prevo-verified", true);
      console.log("ByPassed");
      let dReqUnlockAccount = await axios.get(
        `${backend}/api/account-sessions/prevo/blocked-verify?_code=${e.target.code.value}`,
        {
          mode: "CORS",
          timeout: 8000,
          withCredentials: true,
          headers:{
            Authorization: `Basic ${parseTokenFromStorage.token}`
          }
        }
      );
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex ">
          <h1 className="text-center text-blue-600 font-semibold text-3xl w-auto">
            Access Denied
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-center text-blue-600/50 font-extrabold">
          Please Enter This Captcha Code
        </p>
      </div>
      <div className="flex justify-center items-center pt-1.5">
        <p className="text-center text-blue-600/75 font-extrabold">
          {code || "00000"}
        </p>
      </div>
      <div className="pt-4 flex justify-center items-center">
        <form onSubmit={handleVerificationProggress}>
          <input
            className="py-5 rounded-3xl px-3 border-2 border-blue-600 hover:border-blue-600 outline-none bg-slate-700/80"
            name="code"
          />
        </form>
      </div>
    </>
  );
}
