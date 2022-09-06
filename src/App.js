import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ChangePassword from "./components/ChangePassword";
import Login from "./components/Login";
import AddTaskForm from "./components/forms/AddTaskForm";
import UpdateTaskForm from "./components/forms/UpdateTaskForm";
import TableWithAView from "./components/Table/TableWithAView";
import TableView from "./components/Table/TableView";
// import { useEffect, useState } from "react";
// import axios from "axios";
import Navbar from "./components/Navbar";
import Calendar from "./components/Calendar/Calendar";

export const ailDivision = [
  "GI Advance",
  "GI Maxima",
  "GI Prospera",
  "GI Prima",
  "Metabolics",
  "Neurolife",
  "Vaccine",
  "Women's Health",
];
export const ascDivision = [
  "CCD",
  "CHD",
  "CNS Neuro",
  "Derma Amore",
  "Derma Magna",
  "Derma Prime",
  "Diabetes",
  "Infinia",
  "Insignia",
  "Invicta",
  "Lifecare",
  "Oncology",
  "Unocare",
];
export const apcDivision = [
  "Endura",
  "General",
  "Medicine",
  "Multitherapy",
  "Novacare",
  "Orocare",
  "Osvita",
  "Restora",
];

function App() {
  // const [taskData, setTaskData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:7000/asc/`)
  //     .then((res) => {
  //       setTaskData(res.data);
  //     })
  //     .catch((err) => console.log("Failed to fetch data " + err));
  // }, []);
  const user = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>

        {/* if user is logged in, Calendar will be the first thing they will see  */}
        {user && <Route path="/Calendar" element={<Calendar />} />}
        {user && <Route path="/tableView" element={<TableWithAView />} />}

        {/* if user is not logged in, redirect them to login page  */}
        {!user && <Route path="/Calendar" exact element={<Login />} />}
        {!user && <Route path="/tableView" exact element={<Login />} />}
        {!user && <Route path="/addtask" exact element={<Login />} />}


        {/* if user is not logged in, Login page will be the first thing they will see  */}
        {<Route path="/" exact element={<Login />} />}
        <Route path="changepassword" element={<ChangePassword />} />
        {/* <Route path="/login" exact element={<Navigate replace to="/" />} /> */}
        {/* {user && <Route path="/" exact element={<Navigate replace to="/Calendar" />} />} */}
        <Route
          path="/addtask"
          element={
            <AddTaskForm
              ailDivision={ailDivision}
              ascDivision={ascDivision}
              apcDivision={apcDivision}
            />
          }
        />

        {/* Redirect user if an address is invalid*********************************** */}
        <Route path='*'>
          <Route path="*" element={<Navigate to="/Calendar" replace />} />
        </Route>
        {/* <Route
          path="/updatetask"
          element={
            <UpdateTaskForm
              ailDivision={ailDivision}
              ascDivision={ascDivision}
              apcDivision={apcDivision}
            />
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
