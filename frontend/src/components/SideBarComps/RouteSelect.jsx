import { useState } from "react"

const RouteSelect = () => {
    const [isSelected, setIsSelected] = useState(null)
    const [openIndex, setOpenIndex] = useState(null)


    const handleSelect = (index) => {
        setIsSelected(index)
        setOpenIndex(openIndex === index ? null : index)
    }

    const events = []
    let eventCount = 10
    for(let i=0; i < eventCount; i++){
        events.push(`Event ${i+1}`)
    }
    return (
        <>
            <div className="space-y-1 pt-4 pb-4 pr-2 h-fit">
                {events.map((event, index) => (
                    <Route 
                        key={index}
                        icon={""} 
                        route={event} 
                        isSelected={isSelected === index}
                        isOpen={openIndex === index}
                        onClick={() => handleSelect(index)}
                    />
                ))}
            </div>
        </>
    )
}

const Route = ({ icon, route, isSelected, isOpen, onClick }) => {
    return (
        <div>
            <button
                className={`flex items-center justify-start gap-s w-full rounded px-2 py-1.5 text-sm cursor-pointer ${
                    isSelected
                        ? "bg-primary/40 text-text shadow font-bold"
                        : "hover:bg-primary/40 bg-transparent text-textmuted shadow-none"
                    }`}
                onClick={onClick}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    {route}
                </div>
            </button>

            {isOpen && (
                <div className="mt-2 space-y-1 rounded-lg">
                    <button className="w-full px-2 py-2 rounded hover:bg-primary/40 text-left text-xs">
                        - Snapshot 1
                    </button>
                    <button className="w-full px-2 py-2 rounded hover:bg-primary/40 text-left text-xs">
                        - Snapshot 2
                    </button>
                    <button className="w-full px-2 py-2 rounded hover:bg-primary/40 text-left text-xs">
                        - Snapshot 3
                    </button>
                </div>
            )}
        </div>
    )
}

export default RouteSelect