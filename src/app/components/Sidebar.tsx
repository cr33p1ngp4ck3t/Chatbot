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
                    <div className={"h-full bg-[#111e30] w-64"}>
                        <div className="p-4">
                            <div>
                                <div className="flex items-center justify-between">
                                    <button onClick={handleMenu}>
                                        <img src="/menu.svg" alt="" className="w-6 h-6 invert"/>
                                    </button>
                                    <button className="text-white">
                                        <img src="/newchat.svg" alt="" className="w-6 h-6 invert"/>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleMenu} className="p-6 bg-[#334155] flex gap-4 items-center ">
                        <img src="/menu.svg" alt="" className="w-6 h-6 invert"/>
                        <img src="/newchat.svg" alt="" className="w-6 h-6 invert"/>
                        
                    </button>

                )
            }
        </>
    )
}