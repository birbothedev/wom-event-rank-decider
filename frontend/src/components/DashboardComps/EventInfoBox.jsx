import { useReactTable, getCoreRowModel, createColumnHelper, flexRender, getSortedRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi"
import CreateNew from "../SideBarComps/CreateNew"

const data = [
    { id: 1, name: "runescapeplayer1", rank: 1, group: "one" },
    { id: 2, name: "runescapeplayer2", rank: 4, group: "two" },
    { id: 3, name: "runescapeplayer3", rank: 6, group: "three" },
    { id: 4, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 5, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 6, name: "runescapeplayer3", rank: 3, group: "three" },
    { id: 7, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 8, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 9, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 10, name: "runescapeplayer3", rank: 6, group: "three" },
    { id: 11, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 12, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 13, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 14, name: "runescapeplayer1", rank: 1, group: "one" },
    { id: 15, name: "runescapeplayer2", rank: 4, group: "two" },
    { id: 16, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 17, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 18, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 19, name: "runescapeplayer3", rank: 5, group: "three" },
    { id: 20, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 21, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 22, name: "runescapeplayer3", rank: 3, group: "three" },
    { id: 23, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 24, name: "runescapeplayer3", rank: 1, group: "three" },
    { id: 25, name: "runescapeplayer3", rank: 2, group: "three" },
    { id: 26, name: "runescapeplayer3", rank: 2, group: "three" },
]

const columnHelper = createColumnHelper();

const columns = [
    {
        id: "select",
        header: ({ table }) => (
        <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
        />
        ),
        cell: ({ row }) => (
        <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
        />
        ),
    size: 10,
    },
    columnHelper.accessor("name", {
        header: () => "Name",
        cell: info => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("rank", {
        header: () => "Rank",
        cell: info => info.getValue(),
        enableSorting: true,
    }),
    // columnHelper.accessor("group", {
    //     header: () => "Group",
    //     cell: info => info.getValue(),
    //     enableSorting: true,
    // }),
]

const EventInfoBox = () => {
    const [openForm, setOpenForm] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState([])
    const [tableData, setTableData] = useState(data)

    const table = useReactTable({
        data: tableData,
        columns,
        state: { rowSelection, sorting },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
        getRowId: row => row.id
    })

    const handleDelete = () => {
        setTableData(old =>
            old.filter(row => !rowSelection[row.id])
        )
        setRowSelection({})
    }

    return (
    <>
        <div className="flex flex-col h-[600px]">
            <div>
                Event Description
            </div>
            <div className="flex flex-row justify-between py-2">
                <DeleteButton handleDelete={handleDelete} />
                <button 
                    className="gap-s rounded py-2 px-2 text-sm cursor-pointer text-left hover:bg-primary/40"
                    onClick={() => setOpenForm(true)}
                >
                    + New Event
                </button>
            </div>
            <div className="overflow-x-auto flex-1 rounded-lg border-2 border-border scrollbar-custom shadow-xl">
            <table className="min-w-full min-h-full divide-y divide-border">
                <thead className="bg-primary/40 sticky top-0 z-10 backdrop-blur-sm">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th
                            key={header.id}
                            className="px-4 py-2 text-left text-sm font-medium text-text cursor-pointer select-none"
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            <div className="flex items-center">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                <span className=" ml-1">
                                    <FiChevronUp
                                    className={`w-3 h-3 ${header.column.getIsSorted() === "asc" ? "text-text" : "text-textmuted/60"}`}
                                    />
                                    <FiChevronDown
                                    className={`w-3 h-3 ${header.column.getIsSorted() === "desc" ? "text-text" : "text-textmuted/60"}`}
                                    />
                                </span>
                                )}
                            </div>
                        </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="divide-y divide-border">
                {table.getRowModel().rows.map(row => (
                    <tr
                    key={row.id}
                    className="hover:bg-primary/40 even:bg-primary/20"
                    >
                    {row.getVisibleCells().map(cell => (
                        <td
                        key={cell.id}
                        className="px-4 py-2 text-sm text-text/90"
                        >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>            
        </div>

        <CreateNew isOpen={openForm} onClose={() => setOpenForm(false)}/>
    </>
    )
}

const DeleteButton = ({ handleDelete }) => (
    <button
        onClick={handleDelete}
        className="py-2 px-4 text-red-500 hover:text-red-700"
        title="Delete selected rows"
    >
        <FiTrash2 size={20} />
    </button>
)

export default EventInfoBox