import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Static/Hero'
import Navbar from '../components/Static/Navbar'
import { Spinner } from '@chakra-ui/react'
import Card from '../components/Card'
import { useRouter } from 'next/router'
import Moderation from '../components/Index/Moderation'
import MiniGame from '../components/Index/MiniGame'
const Home: NextPage = () => {
    const router = useRouter()
    return (
        <>
            <Hero/>
            <div className="pt-6 flex pr-6 space-x-2 pl-4" onClick={() => router.push("/latest")}>
                <div onClick={() => router.push("/latest")}>
                    <h1 className="text-xl font-extrabold pl-4 text-blue-600">Latest Plugins</h1>
                    <p className="text-xs text-gray-300 pl-4">This plugins latest added to the system</p>
                </div>
             </div>

            <div className="pt-6 flex space-x-2 pl-4" onClick={() => router.push("/moderation")}>
                <div onClick={() => router.push("/moderation")}><h1 className="text-xl font-extrabold pl-4 text-blue-600">Moderation Plugins</h1>
                    <p className="text-xs text-gray-300 pl-4">This plugins latest added to the system</p>
                </div>
                <div className="">
                  
                </div>
            </div>

          <Moderation />
            <div className="pt-6 flex space-x-2 pl-4">
                <div><h1 className="text-xl font-extrabold pl-4 text-blue-600">Mini Game Plugins</h1>
                    <p className="text-xs text-gray-300 pl-4">This plugins latest added to the system</p>
                </div>
                <div className=""></div>
            </div>
         <MiniGame />
        </>
    )
}

export default Home