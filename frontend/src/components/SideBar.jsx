import React from 'react'
import RouteSelect from './SideBarComps/RouteSelect'
import CreateNew from './SideBarComps/CreateNew'

const SideBar = () => {
    return (
        <div className="px-8 py-5 rounded-lg">
            <div className="sticky top-8 scrollbar-custom">
                <CreateNew />
                <RouteSelect />
            </div>
        </div>
    )
}

export default SideBar