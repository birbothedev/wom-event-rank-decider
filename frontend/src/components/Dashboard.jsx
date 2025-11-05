
import EventInfoBox from './DashboardComps/EventInfoBox'
import Topbar from './DashboardComps/Topbar'
import { useState } from 'react'
import { ExportEvent } from './Forms/ExportEvent'
import CreateGroup from './Forms/CreateGroup'

const Dashboard = () => {
    const [openForm, setOpenForm] = useState(false)

    return (
        <>
            <div className="rounded-lg pb-4 flex flex-col bg-darkbackground shadow-2xl shadow-darkbackground border-border border">
                <div className="px-8">
                    <Topbar />
                </div>
                <div className="px-8 py-2 shadow-2xl">
                    <EventInfoBox />
                </div>
                <div className="pr-8 place-self-end">
                    <button className="gap-s rounded py-2 px-2 text-md cursor-pointer text-left hover:bg-primary/40">
                        <CreateGroup />
                    </button>
                    {/* <button className="gap-s rounded py-2 px-2 text-md cursor-pointer text-left hover:bg-primary/40">
                        Create Snapshot
                    </button> */}
                    <button className="gap-s rounded py-2 px-2 text-md cursor-pointer text-left hover:bg-primary/40"
                    onClick={() => setOpenForm(true)}
                    >
                        Export Event
                    </button>
                </div>
            </div>

            <ExportEvent isOpen={openForm} onClose={() => setOpenForm(false)}/>
        </>
    )
}

export default Dashboard