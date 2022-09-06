import "./TableView.css";
import Navbar from "../Navbar";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, useRowSelect } from "react-table";
import { COLUMNS } from "./columns";
import LoadingSpinner from "../UI/LoadingSpinner";
import EditTableData from "../forms/EditTableData";
import { Checkbox } from "./Checkbox";
import * as XLSX from 'xlsx/xlsx.mjs';

function TableView() {

    //setting page title*********************************************************
    useEffect(() => {
        document.title = "Table View";
    }, []);

    const [taskData, setTaskData] = useState([]);
    const [bu, setBu] = useState("asc");
    const [sortToggle, setSortToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //send this data to edit component
    const [editTaskData, setEditTaskData] = useState()

    //state to edit row
    const [editableRowIndex, setEditableRowIndex] = useState();

    //modal state
    const [showModal, setShowModal] = useState(false);

    // state for sorting date 
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const buUpdate = (e) => {
        setBu(e.target.value)
    };

    //to store 'bu' in local storage so that it will be accessable to other components (columnFilters.js)
    localStorage.setItem("buState", bu);
    const hideModalHandler = () => {
        setShowModal(false)
    }

    useEffect(() => {

        setIsLoading(true)

        axios.get(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`)
            .then(function (response) {
                // console.log(response.data);
                return response
            })
            .then(receivedData => {

                // console.log(receivedData.data, " received data");

                const data = [];

                // the data we receive as response is an object which has a unique id and 'server' data as key value pairs. So to extract data from those unique key, below is the code
                for (const key in receivedData.data) {
                    const dataObj = {
                        id: key,
                        ...receivedData.data[key]
                    }
                    data.push(dataObj)
                }
                setTaskData(data);
                // console.log(data, "Table with a view")
                setIsLoading(false)
            })
            .catch(function (error) {
                // handle error
                alert(error.message + " Please try again.");
                setIsLoading(false)
            })
    }, [bu]);

    // export button functionality***************************
    const handleOnExport = () => {
        // console.log(taskData);
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(taskData);
        XLSX.utils.book_append_sheet(wb, ws, `${bu}`.toUpperCase());
        XLSX.writeFile(wb, `${bu}.xlsx`)
    };

    //Always memoize the data to speed-up the application when huge data is involved.
    //  COLUMNS is imported from the component columns.js
    const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => taskData, []);

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        headerGroups,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps
        // state: { pageIndex, pageSize, selectedRowIds, globalFilter }
    } = useTable({
        columns,
        data: taskData,
        editableRowIndex,
        setEditableRowIndex
    },
        useFilters,
        useSortBy,
        useRowSelect,

        // to add Edit column **********************************************************
        (hooks) => {
            hooks.visibleColumns.push((columns => [
                ...columns,
                {
                    Header: "Action",
                    id: "actionButton",
                    Cell: ({ row }) => (
                        <button
                            className="action-button"
                            onClick={() => {
                                const currentIndex = row.index;
                                //opens modal***************
                                setShowModal(true);
                                //sends data to EditTable.js****************
                                setEditTaskData(row.values);
                            }}
                        >
                            Edit
                        </button>
                    )
                }
            ]))
        }
    )
    return (
        <>
            <div className="tableView">
                <Navbar />

                <div className="tableContainer">
                    {
                        <table {...getTableProps()} className="table">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(
                                                    sortToggle && column.getSortByToggleProps()
                                                )}
                                            >
                                                {column.render("Header")}{" "}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? "⬇"
                                                            : "⬆"
                                                        : ""}
                                                </span>
                                                <div>
                                                    {column.canFilter ? column.render("Filter") : null}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {isLoading && <LoadingSpinner />}
                                    </td>
                                </tr>
                            </tbody>
                            {!isLoading && <tbody {...getTableBodyProps()}>
                                {taskData.length !== 0 && rows.map((row) => {
                                    prepareRow(row);
                                    return (

                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                                {taskData.length === 0 && <tr>
                                    <td>No tasks Found. Add some tasks.
                                    </td>
                                </tr>}
                            </tbody>}
                        </table>
                    }
                </div>

                {/* Sort Date************************************************************* */}
                {!isLoading && taskData.length!==0 && <div className="date-input">
                    <label className="date-range">
                        Start Date:
                        <input className="date-range" type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value) }} />
                    </label>

                    <label className="date-range">
                        End Date:
                        <input className="date-range" type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value) }} />
                    </label>
                </div>}

                {/* bu selector********************************************************** */}
                <div className="filterContainer">
                    <select className="buSelector" value={bu} name="bu" id="bu" onChange={buUpdate}>
                        <option value="asc">ASC</option>
                        <option value="ail">AIL</option>
                        <option value="apc">APC</option>
                    </select>
                    <div className="sortContainer">
                        <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                            onChange={() => setSortToggle((prev) => !prev)}
                        />
                        <label htmlFor="checkbox">Sort</label>
                    </div>
                </div>
                {showModal && <EditTableData data={editTaskData} onClose={hideModalHandler} />}
            </div>

            {/* Export button********************************* */}
            <div>
                <button disabled={taskData.length === 0} onClick={handleOnExport}>Export</button>
            </div>

            {/* Checkboxes****************************** */}
            {/* <div className="toggle-column">
                <div className="toggle-checkbox">
                    <Checkbox {...getToggleHideAllColumnsProps()} />
                </div>
                <div>
                    {
                        <div>
                            <label>
                                <input type="checkbox" {...allColumns[0].getToggleHiddenProps()} />
                                {allColumns[0].Header}
                            </label>
                        </div>
                    }
                </div>
            </div> */}
        </>
    );
}

export default TableView;