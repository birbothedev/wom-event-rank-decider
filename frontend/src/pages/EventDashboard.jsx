import React from 'react'
import SideBar from '../components/SideBar'
import Dashboard from '../components/Dashboard'

const EventDashboard = () => {
    return (
        // <div className="p-4 grid grid-gap-4 grid-cols-[220px_1fr]">
        //     <SideBar />
        //     <Dashboard />
        // </div>
        <div className="p-4 max-h-fit">
            <Dashboard />
        </div>
    )
}

export default EventDashboard