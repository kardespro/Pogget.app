import { useRouter } from "next/router";

export default function Test({ data }) {
  const router = useRouter();
  return (
    <>
      <div className="flex ml-4 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
        {data.map((item, index) => {
          return (
            <>
              <div className="w-full p-4 md:p-0 mb-1.5 md:mb-0" >
                <div className="border border-blue-600 bg-gray-900 rounded-3xl py-5 px-6 hover:border-green-600 hover:scale-105">
                  <div className="flex space-x-3 mt-1.5">
                    <div className="w-8 h-8">
                      <img
                        src={item.authorIcon}
                        className="rounded-full w-8 h-8 "
                      />
                    </div>
                    <div className=" text-white mt-1">
                      <p className=" font-bold">{item.title}</p>
                    </div>
                    <div className="flex justify-end place-items-end pl-12 pt-1">
                      <button
                        className="bg-slate-100 rounded-md  text-xs py-1 px-1 font-bold"
                        onClick={() => router.push(`/plugin/${item._id}`)}
                      >
                        View Plugin
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="pl-1 break-words text-white">
                      <p className="break-words font-bold">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <p className="text-xs text-gray-300 font-bold pl-2">
                      Dec 30 , 2023 • 133 views
                    </p>
                  </div>
                  <div className="pt-6">
                    <div className="max-w-auto ">
                      <img
                        src="https://raw.githubusercontent.com/TrFolwe/WorldGuardian/main/assets/img.png"
                        className="rounded-2xl visible md:hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
