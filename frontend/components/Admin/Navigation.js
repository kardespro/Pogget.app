import { useRouter } from "next/router";
export default function Navigation() {
  const router = useRouter();
  return (
    <>
      <div className="p-4 md:p-0">
        <p className="text-center text-blue-600  text-xs font-bold">
          Navigation
        </p>
        <div className=" bg-gray-900 rounded-3xl py-5 px-5 ">
          <div className="text-center text-slate-100">
            <h1
              className="pt-2 flex justify-center items-center space-x-2"
              onClick={() => router.push("/admin")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
              </span>
              <span className="text-xs md:text-xl font-bold">Home</span>
            </h1>

            <h1
              className="pt-2 flex justify-center items-center space-x-2"
              onClick={() => router.push("/admin/plugins")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                  />
                </svg>
              </span>
              <span className="text-xs md:text-xl font-bold">Plugins</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
