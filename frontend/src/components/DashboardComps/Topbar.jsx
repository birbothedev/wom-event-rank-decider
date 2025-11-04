import React from 'react'

const Topbar = () => {

    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long", 
        day: "numeric" 
    })

    return (
        <div className="border-b-3 mt-2 mb-4 py-2 border-bordermuted">
            <div className="flex flex-row p-0.5 justify-between">
                <div>
                    <span className="text-lg font-bold block">👋 Hello, Clan Name!</span>
                    <span className="text-sm block">{formattedDate}</span>
                </div>
            </div>
        </div>
    )
}

export default Topbar