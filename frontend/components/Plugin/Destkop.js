export default function Destkop({
  data,
  handleStar,
  StarState,
  handleUnStar,
  children,
}) {
  return (
    <>
      <div className="flex space-x-2 pl-2">
        <div>
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
                {StarState ? (
                  <button
                    className="py-5 px-5 rounded-3xl bg-slate-700 text-white font-extrabold w-72 border-4  border-amber-300"
                    onClick={handleUnStar}
                  >
                    Starred
                  </button>
                ) : (
                  <button
                    className="py-5 px-5 rounded-3xl bg-slate-700 text-white font-extrabold w-72 border-4 border-gray-300 hover:border-amber-300"
                    onClick={handleStar}
                  >
                    Star
                  </button>
                )}
              </div>
            </div>
          </div>






        </div>
        <div className="pl-24">{children}</div>
      </div>
    </>
  );
}
