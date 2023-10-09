import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import WebSocket from "ws";
import { backend_ws, backend } from "../../../config.ts";
import ErrorToast from "../../../components/Toast/Error";
import SuccessToast from "../../../components/Toast/Success";
import Tabs from "../../../components/Tabs";
import Remarkable from "remarkable"; // Markdown'ı HTML'e dönüştürmek için marked kütüphanesini kullanacağız

export default function Plugin({ id }) {
  const router = useRouter();

  const [error, setError] = useState();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showToastt, setShowToastt] = useState(false);
  const [loader, setLoader] = useState(true);
  const [readmeContent, setReadmeContent] = useState("");
  const [starable, setStarAble] = useState(false);
  useEffect(() => {
    (async () => {
      if (!id) {
        setLoader(true);
      }
      let plugin = await axios.get(`${backend}/api/plugins/${id || "0"}`);
      setData(plugin.data.d);
      setLoader(false);
      if (plugin.data.status === 404) {
        setLoader(true);
        //setData(null)
        setError("Plugin Not Found");
      } else if (plugin.data.status === "WAITING") {
        setLoader(false);
        //setData(null)
        setData(plugin.data.d);
      } else if (plugin.data.status === "APPROVED") {
        setData(plugin.data.d);
        setLoader(false);
      }
      setTimeout(() => {
        setData(plugin.data.d);
      }, 1000);
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      let w = window.localStorage.getItem("pogget-auth");
      if (!w) return setUser(null);
      let w1 = JSON.parse(w);
      let user = await axios.get(`${backend}/api/users/@me`, {
        headers: { Authorization: `Basic ${w1.token}` },
      });
      setUser(user.data);
    })();
  }, []);
  const handleStar = async () => {
    if (!user) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    if (user) {
      let w = window.localStorage.getItem("pogget-auth");
      let w1 = JSON.parse(w);
      let d = await axios.get(`${backend}/api/users/@me/stars`, {
        headers: { Authorization: `Basic ${w1.token}` },
      });
      let dd = await axios.post(`${backend}/api/plugins/${id}/star`, {
        headers: { Authorization: `Basic ${w1.token}` },
      });
      setStarAble(true);
      //
      setShowToastt(true);
      setTimeout(() => {
        setShowToastt(false);
      }, 3000);
    }
  };

  /*const markdownToHTML = (markdown) => {
      const remarkable = new Remarkable();
      const html = remarkable.render(markdown);
      return { __html: html };
    };*/
  function overview() {
    return (
      <>
        <div>
          <div className="pt-2">
            <h1 className="flex space-x-2 text-xl text-blue-600 pl-4 font-extrabold">
              <span>
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
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </span>
              <span>Details</span>
            </h1>
          </div>
          <div>
            <p className="pt-4 pl-4 text-gray-300 font-bold text-md">
              Category: <span className="text-blue-600">{data.category}</span>
            </p>
            <p className=" pl-4 text-gray-300 font-bold text-md">
              Description:{" "}
              <span className="text-blue-600">{data.description}</span>
            </p>
            <p className=" pl-4 text-gray-300 font-bold text-md">
              Github Repository:{" "}
              <span
                onClick={() => (window.location.href = `${data.repoURL}`)}
                className="text-blue-600 cursor-pointer"
              >
                Click
              </span>
            </p>
            <p className=" pl-4 text-gray-300 font-bold text-md">
              Version: <span className="text-blue-600">1.0</span>
            </p>
            <p className=" pl-4 text-gray-300 font-bold text-md">
              Stars: <span className="text-blue-600">{data.starCount}</span>
            </p>
          </div>
          <div>
            <div className="pt-6">
              <h1 className="flex space-x-2 text-xl text-blue-600 pl-4 font-extrabold">
                <span>
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
                      d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                    />
                  </svg>
                </span>
                <span>Author</span>
              </h1>
            </div>
            <div
              className="pl-4 flex pt-4 cursor-pointer"
              onClick={() =>
                window.location.replace(`https://github.com/${data.author}`)
              }
            >
              <img
                src={data?.authorIcon}
                className="rounded-full w-10 h-10"
                alt=""
              />
              <p className="text-blue-600 font-bold pt-1 pl-2">
                {data.author || ""}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function comments() {
    return (
      <>
        <div>
          {user && (
            <form className="flex justify-center items-center space-x-2">
              <input
                className="py-5 px-5 rounded-3xl border-2 border-blue-600 bg-gray-900 hover:outline-none hover:border-blue-600 focus:border-blue-600 text-white"
                name="comment"
                placeholder="Your Comment Here"
              />
              <button className="bg-blue-600 py-5 px-5 rounded-3xl text-white">
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
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
        <div className="pt-12">
          <div className="py-5 px-5 rounded-3xl border-2 border-gray-300/100">
            <div className="text-center flex space-x-2 pl-6">
              <img src={data.authorIcon} className="w-8 h-8 rounded-full" />{" "}
              <h1 className="pl-2 text-gray-300  text-xl">Nego</h1>
            </div>
            <div className="pt-4">
              <p className="text-sm text-center text-gray-300/100">
                Bu Eklentiyi Yapan Kel Folweyi *****
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function admin() {
    return (
      <>
        {/*<div className="p" dangerouslySetInnerHTML={markdownToHTML(readmeContent)} /> */}
      </>
    );
  }

  return (
    <div>
      {error && (
        <h1 className="text-red-700 text-center pt-24 font-extrabold">
          {error}
        </h1>
      )}
      {data ? (
        <>
          {loader ? (
            <>
              <div className="flex justify-center items-center pt-6 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 animate- -an animate-spin text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              {data && (
                <div className="pt-12">
                  <div className="flex justify-center items-center">
                    <img
                      src={data.iconURL}
                      className="w-32 h-32 rounded-full border-2 border-blue-600 bg-gray-300/50"
                    />
                  </div>
                  <div>
                    <h1 className="text-center font-extrabold text-blue-600 pt-4 text-xl">
                      {data.title || "Null"}
                    </h1>
                  </div>
                  <div className="pt-6">
                    <div className="flex justify-center items-center  ">
                      <button className="py-5 px-5 rounded-3xl bg-blue-600 text-white font-extrabold w-72 border-4 border-blue-600">
                        Download
                      </button>
                    </div>
                    <div className="flex justify-center items-center  pt-2">
                      <button
                        className="py-5 px-5 rounded-3xl bg-slate-700 text-white font-extrabold w-72 border-4 border-gray-300 hover:border-amber-300"
                        onClick={handleStar}
                      >
                        Star
                      </button>
                    </div>
                  </div>
                  {/*<Tabs children={overview} childrenone={comments} childrentwo={admin}/>*/}
                  <Tabs>
                    {overview}
                    {comments}
                    {admin}
                  </Tabs>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center pt-6 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate- -an animate-spin text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </div>
        </>
      )}
      {showToast && <ErrorToast message="Login Required" />}
      {showToastt && <SuccessToast message="Successfull Started" />}
    </div>
  );
}
