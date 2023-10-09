import axios from 'axios'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import { backend } from '../config.ts'
import Card from '../components/Card'
export default function Moderation() {
    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState()
    const [sable, ssable] = useState()
    useEffect(() => {
        (async () => {
            setLoading(true)
            let d = await axios.get(`${backend}/api/global/plugins`)
            let f = d.data.data.filter(a => a.status === "APPROVED" && a.category === "moderation")
            setLoading(false)
            setData(f)
          
          
        })()
      
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        let d = data.filter(a => a.title.includes(e.target.search.value))
        setLoading(false)
        if (d === []) {
            setData(data)
        }
        setData(d || data)
        ssable(true)
    }
    const hgf = async () => {
        ssable(false)
        setLoading(true)
        let plugins = (await axios.get(`${backend}/api/global/plugins`)).data;
        let f = plugins.data.filter(a => a.status === "WAITING" && a.category === "moderation")
        setLoading(false)
        setData(f)
    }
    return (
        <>
            <div className="flex pt-12 justify-center items-center">
                <form className="flex justify-center items-center space-x-2" onSubmit={handleSubmit}>
                    <div>
                        <input name="search"
                               className="border-2 border-blue-600 bg-gray-900 rounded-3xl py-5 px-5 outline-none hover:border-blue-600 focus:border-blue-600 placeholder-white text-white"
                               placeholder="Search..."/>
                    </div>
                    <div>
                        <button className="bg-blue-600 py-5 px-5 rounded-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-5 pt-2 pb-2 pl-2 flex flex-wrap gap-2 items-center max-sm:flex-col">
                {loading ? (
                    <>
                        <div className="flex justify-center items-center pt-24">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-10 h-10 animate- -an animate-spin text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                            </svg>

                        </div>
                    </>
                ) : (
                    <>
                        <Card data={data}/>




                        {sable ? (
                            <>
                                <div
                                    className="fixed bottom-4 left-4 transition-all duration-300 delay-150 ease-in-out">
                                    <button className="p py-5 px-5 rounded-3xl bg-blue-600 text-white" onClick={hgf}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
}