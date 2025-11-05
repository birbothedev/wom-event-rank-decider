import { useState } from "react"

export function ExportEvent({ isOpen, onClose }){
    if (!isOpen) return null

    // export event as json or txt

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-110">
            <div className="w-2xl flex flex-col gap-2">
                <button className="text-2xl place-self-end cursor-pointer hover:bg-bordermuted/60 hover:text-hovertext rounded-full px-3 pt-1 pb-2 flex text-center items-center justify-center" onClick={onClose}>
                    ×
                </button>
                <div className="bg-primary/20 p-4 rounded-2xl flex flex-col gap-4">
                    <div className="py-4 px-4 pl-1 rounded-full text-3xl font-bold">Export Event</div>
                    <div className="border-primary border-3 rounded-2xl p-4 text-md flex flex-col gap-4">
                        insert event preview before exporting
                    </div>
                    <button className="text-xl place-self-end cursor-pointer hover:bg-bordermuted/60 rounded-full px-3 pt-1 pb-2 flex text-center items-center justify-center hover:text-darkblue" 
                    onClick={onClose}
                    >
                        Export
                    </button>
                </div>
            </div>
        </div>
    )
}