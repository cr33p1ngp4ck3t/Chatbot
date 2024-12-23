/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import "../styles/globals.css"

export default function Sidebar() {
    const [open, setOpen] = useState(true)
    const handleMenu = () => {
        return setOpen(prevState => !prevState)
    }

    return (
        <>
        { 
            open ? (
                <div className={"h-screen bg-[#111e30] w-64 transition-all duration-300 ease-in-out transform  "}>
                    <div className="p-4">
                        <div>
                            <div className="flex items-center justify-between">
                                <button onClick={handleMenu} className="transition-transform duration-300 hover:scale-110 ">
                                    <img src="/menu.svg" alt="" className="w-6 h-6 invert"/>
                                </button>
                                <button className="text-white transition-transform duration-300 hover:scale-110">
                                    <img src="/newchat.svg" alt="" className="w-6 h-6 invert"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={handleMenu} className="p-4 bg-[#334155] flex gap-4 transition-all duration-300 ease-in-out transform ">
                    <img src="/menu.svg" alt="" className="w-6 h-6 invert transition-transform duration-300 hover:scale-110 "/>
                    <img src="/newchat.svg" alt="" className="w-6 h-6 invert transition-transform duration-300 hover:scale-110"/>
                </button>
            )
        }
        </> 
    )
}