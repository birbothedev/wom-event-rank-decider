import React, { useState } from 'react'
import RouteSelect from './SideBarComps/RouteSelect'
import CreateNew from './SideBarComps/CreateNew'

const SideBar = () => {
    const [openForm, setOpenForm] = useState(false)

    return (
        <>
            <div className="px-8 py-5 rounded-lg">
                <div className="sticky top-8 scrollbar-custom">
                <div className="border-b-3 border-bordermuted pt-4 pb-1">
                    <button 
                        className="gap-s rounded py-2 px-2 w-full text-sm cursor-pointer text-left hover:bg-primary/40"
                        onClick={() => setOpenForm(true)}
                    >
                        + New Event
                    </button>
                </div>
                    <RouteSelect />
                </div>
            </div>       

            <CreateNew isOpen={openForm} onClose={() => setOpenForm(false)}/>
        </>

    )
}

export default SideBar