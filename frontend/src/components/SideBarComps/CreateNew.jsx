import { useState } from "react"

const CreateNew = ({isOpen, onClose}) => {
    const [formContent, setFormContent] = useState({
        eventname: "",
        description: "",
        players: "",
    })
    const [file, setFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const longlimit = 6500
    const mediumlimit = 100
    const shortlimit = 50

    const handleChange = (e) => {
        const {name, value, maxLength, tagName} = e.target
        setFormContent((prev) => ({
            ...prev,
            [name]: value.slice(0, maxLength)
        }))

        if (tagName === "TEXTAREA") {
            e.target.style.height = "auto"
            e.target.style.height = e.target.scrollHeight + "px"
        }
    }

    const handleMediaChange = (e) => {
        // call file reader function
    }

    const handleSubmit = () => {
        setFormContent({ eventname: "", description: "", players: "" })
        setFile(null)
        setFilePreview(null)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-110">
            <div className="w-2xl flex flex-col gap-2">
                <button className="text-2xl place-self-end cursor-pointer hover:bg-bordermuted/80 hover:text-hovertext rounded-full px-3 pt-1 pb-2 flex text-center items-center justify-center" onClick={onClose}>
                    ×
                </button>
                <div className="bg-lightbackground/80 p-4 rounded-2xl flex flex-col gap-4">
                    <div className="py-4 px-4 pl-1 rounded-full text-3xl font-bold">Create an Event</div>
                    <form className="border-primary border-3 rounded-2xl p-4 text-md flex flex-col gap-4">
                        <>
                            <label className="flex justify-between items-center gap-2">
                                <span>Event Name</span>
                                <span className="text-sm text-gray-500">
                                    {formContent.eventname.length}/{shortlimit}
                                </span>
                            </label>
                            <input 
                                className="border-primary border rounded-2xl p-3" 
                                type="text"
                                maxLength={shortlimit}
                                name="eventname"
                                placeholder="Enter the name of your event"
                                value={formContent.eventname}
                                onChange={handleChange}
                            />
                        </>
                        <>
                            <label className="flex justify-between items-center gap-2">
                                <span>Event Description</span>
                                <span className="text-sm text-gray-500">
                                    {formContent.description.length}/{mediumlimit}
                                </span>
                            </label>
                            <input 
                                className="border-primary border rounded-2xl p-3" 
                                type="text"
                                maxLength={shortlimit}
                                name="description"
                                placeholder="A short description of your event"
                                value={formContent.description}
                                onChange={handleChange}
                            />
                        </>
                        <>
                            <label className="flex justify-between items-center gap-2">
                                <span>Player Names</span> 
                                <span className="text-sm text-gray-500">
                                    {formContent.players.length}/{longlimit}
                                </span>
                            </label>
                            <textarea 
                                className="border-primary border rounded-2xl p-3 overflow-hidden resize-none" 
                                maxLength={longlimit}
                                placeholder="playername1,playername2,playername3"
                                rows={3}
                                name="players"
                                value={formContent.players}
                                onChange={handleChange}
                            />
                        </>
                        <>
                            <label className="flex justify-between items-center gap-2">
                                <span className="flex flex-col">
                                    <span>Player List File Upload</span>
                                    <span className="text-xs">Accepted formats: .csv or .txt</span>
                                </span>
                            </label>
                            <input 
                                className="border-primary border rounded-2xl p-3 cursor-pointer" 
                                type="file"
                                name="media"
                                accept=".csv,.txt"
                                onChange={handleMediaChange}
                            />
                        </>
                    </form>
                    <button className="text-xl place-self-end cursor-pointer hover:bg-bordermuted/80 rounded-full px-3 pt-1 pb-2 flex text-center items-center justify-center hover:text-darkblue" 
                    onClick={() => {
                        handleSubmit()
                        onClose()
                    }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateNew