import axios from 'axios'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import { backend, backend_ws } from '../../config.ts'
import Card from '../Card'
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
  
    return (
        <> 
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