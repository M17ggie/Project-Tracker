import "./TableView.css";
import Navbar from "../Navbar";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { COLUMNS } from "./columns";
import LoadingSpinner from "../UI/LoadingSpinner";
// import * as data from './MOCK_DATA.json';
// import { ailDivision } from "../../App";
// import { ascDivision } from "../../App";
// import { apcDivision } from "../../App";
import * as XLSX from 'xlsx/xlsx.mjs';
// import XLSX from "xlsx";

function TableView() {
  // let receivedData = JSON.parse(data);
  // console.log(receivedData);
  const [taskData, setTaskData] = useState([]);
  const [bu, setBu] = useState("apc");
  const [sortToggle, setSortToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buUpdate = (e) => setBu(e.target.value);

  useEffect(() => {

    setIsLoading(true)

    axios.get(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`)
      .then(function (response) {
        // console.log(response.data);
        return response
      })
      .then(receivedData => {
        //to store 'bu' in local storage so that it will be accessable to other components (columnFilters.js)
        localStorage.setItem("buState", bu);
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
        //  console.log(data)
        setTaskData(data);
        setIsLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
        setIsLoading(false)
      })
  }, [bu])

  const handleOnExport =()=>{
    // console.log(taskData);
    var wb= XLSX.utils.book_new(),
    ws=XLSX.utils.json_to_sheet(taskData);
    XLSX.utils.book_append_sheet(wb,ws,`${bu}`);
    XLSX.writeFile(wb,`${bu}.xlsx`)
  };

  //Always memoize the data to speed-up the application when huge data is involved.
  //  COLUMNS is imported from the component columns.js
  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => taskData, []);

  const tableInstance = useTable(
    { columns, data: taskData },

    useFilters,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
              {taskData.length == 0 && <tr>
                <td>No tasks Found. Add some tasks.
                </td>
              </tr>}
            </tbody>}
          </table>
        }
      </div>
      <div>
        <button onClick={handleOnExport}>Export</button>
      </div>
      <div className="filterContainer">
        <select className="buSelector" name="bu" id="bu" onChange={buUpdate}>
          <option value="asc">asc</option>
          <option value="ail">ail</option>
          <option value="apc">apc</option>
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
    </div>
  );
}

export default TableView;
