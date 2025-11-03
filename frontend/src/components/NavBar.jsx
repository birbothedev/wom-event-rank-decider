import React from 'react'
import { ReportForm } from './ReportForm/ReportForm'
import { useState } from "react"

const listItems = [
    {title: 'Home', link: "/"},
    {title: 'Event Dashboard', link: "/eventdashboard"}
]

const NavBar = () => {
    const [openForm, setOpenForm] = useState(false);

    const handleLogin = () => {
        console.log("login clicked")
    }

    return (
        <>
        <div className="fixed bg-darkbackground/60 flex justify-between items-center gap-16 py-3 px-10 left-1/2 translate-x-[-50%] top-5 rounded-full backdrop-blur-md shadow-lg z-100"
            >
                <ul className="flex gap-8 text-xl">
                    {listItems.map((item) => (
                        <li className="relative group cursor-pointer " key={item.title}>
                            <a href={item.link}>{item.title}</a> 
                            <span className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl bg-secondary/60 transition-all duration-300 group-hover:w-full "></span>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4">
                    {/* <button 
                        className="bg-linear-to-l from-bordermuted to-border py-1 px-6 rounded-full shadow-xl text-lg hover:from-success hover:to-info hover:shadow-success/10 font-semibold hover:text-darkblue cursor-pointer" 
                        onClick={handleLogin}
                    >
                        Login
                    </button>  */}

                    <button 
                        className="bg-primary/20 py-1 px-6 rounded-full shadow-xl text-lg hover:bg-secondary/60 hover:shadow-success/10 font-semibold hover:text-hovertext cursor-pointer" 
                        onClick={() => setOpenForm(true)}
                    >
                        Report an Issue
                    </button>  
                </div>
            </div>

            <ReportForm isOpen={openForm} onClose={() => setOpenForm(false)}/>
        </>
            
    )
}

export default NavBar

