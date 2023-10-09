import { useState, useEffect } from "react";
import axios from "axios";
import {
  backend,
  backend_ws,
  endpoint_user_me,
  admin_names,
} from "../../config.ts";
import Navigation from "../../components/Admin/Navigation";
import Table from "../../components/Admin/Table";
export default function AdminIndex() {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let d = window.localStorage.getItem("pogget-auth");
      if (!d) {
        window.location.href = "/";
      }
      let dtoken = JSON.parse(d);
      let data = await axios.get(`${backend}/${endpoint_user_me}`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${dtoken.token}`,
          },
        })
        if (data.data.status === 401) {
          window.location.href = "/";
        }

      if (!data.data.user) {
        window.location.href = "/";
      }
      let loadAdminNames = admin_names;
      if (data.data.user) {
        if (!loadAdminNames.includes(data.data.user.login)) {
          window.location.href = "/";
        }
        if (loadAdminNames.includes(data.data.user.login)) {
          setUser(data.data.user);
        }
      }
    })();
  }, []);
  // Initiliaze WebSocket Connection
  useEffect(() => {
    // WebSocket bağlantısını oluşturma
    const socket = new WebSocket(
      `${backend_ws}/api/gateway/global/plugins/wait`
    );

    // WebSocket açıldığında çalışacak işlev
    socket.onopen = () => {
      console.log("WebSocket Connection Success.");
    };

    // WebSocket'ten veri alındığında çalışacak işlev
    socket.onmessage = (event) => {
      const receivedData = event.data;
      let datam = JSON.parse(receivedData);
      if (!datam.data) {
        setData(null);
      }
      if (datam.data) {
        setData(datam.data);
      }
      // Gelen veriyi useState ile kaydetme
    };
    // ReCheck
    setInterval(async () => {
      socket.send("Test");
    }, 5000);
    // WebSocket kapatıldığında çalışacak işlev
    socket.onclose = (event) => {
      console.log(
        "WebSocket Connections Error Kod:",
        event.code,
        "Reason:",
        event.reason
      );
    };
    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <h1 className="text-blue-600 font-bold text-center pt-6">
        Hi <span className="text-blue-500 font-bold">Admin</span> ! Welcome To
        Your Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-0 md:gap-2.5">
        <Navigation />
        <div>
          <div className="p-4 md:p-0 md:pl-4">
            <p className="text-center text-blue-600  text-xs font-bold">
              Wating Plugins
            </p>

            <div className="bg-gray-900 rounded-3xl py-5 px-5">
              <div className="">
                <Table data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
