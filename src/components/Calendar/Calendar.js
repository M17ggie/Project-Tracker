import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Login from "../Login";
import Navbar from "../Navbar";
import "./Calendar.css";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";


const Calendar = () => {

  const user = localStorage.getItem("token");

  //setting page title*********************************************************
  useEffect(() => {
    document.title = "Calendar";
  }, [])

  const [fetchedObject, setFetchedObject] = useState();
  const [bu, setBu] = useState("asc");

  // get task data from server on intial load *************************
  useEffect(() => {
    axios
      .get(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`)
      .then((res) => {
        const data = [];

        // the data we receive as response is an object which has a unique id and 'server' data as key value pairs. So to extract data from those unique key, below is the code
        for (const key in res.data) {
          const dataObj = {
            ...res.data[key]
          }
          data.push(dataObj)
        }
        setFetchedObject(data);
      })
      .catch((err) => console.log("Failed to fetch data " + err));
  }, [bu]);

  //to set color *************************************************
  // let COLORS = [];
  // while (COLORS.length < 500) {
  //   COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
  // }

  // function rand(frm, to) {
  //   return ~~(Math.random() * (to - frm)) + frm;
  // }

  // to populate calendar events *****************************************
  const calEvents = [];
  const today = new Date();

  // if fetchedObject is received, fill the calEvents array with the task details *********************
  fetchedObject?.forEach((task) => {
    const tasknamedivision = task["Division"] + " - " + task["Task Name"];
    // console.log("Status: ", task["Status"]);
    if (task["Status"] === "Not Initiated" || task["Status"] === "On Hold") {
      calEvents.push({
        title: tasknamedivision,
        start: task["Received Date"],
        end: today,
        color: 'red'
      });


    }

    if (task['Status'] === ("In Progress" || "Feedback In Progress")) {
      calEvents.push({
        title: tasknamedivision,
        start: task["Received Date"],
        end: today,
        color: 'blue'
      });
    }

    if (task["Status"] == ("Test Link Shared" || "Uploaded to Sandbox")) {
      calEvents.push({
        title: tasknamedivision,
        start: task["Received Date"],
        end: today,
        color: 'green'
      });
    }
  });

  // to add color property to each elements of calEvents*************************** 
  // calEvents.forEach((e, index) => {
  //   calEvents[index].color = COLORS[Math.floor(Math.random() * COLORS.length)];

  // });

  return (
    <div>
      <Navbar />
      <div className="calendarContainer">
        <FullCalendar
          className="calendar"
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={calEvents}
        />

        <div>
          <div className="notInitiated">Not Initiated/On Hold</div>
          <div className="inProgress">In Progress/Feedback In Progress</div>
          <div className="testLinkShared">Test Link Shared/Uploaded to Sandbox</div>
        </div>

        {/* Activity Type*********************************************************** */}
        <label>
          Activity Type:
          <select>
            <option>EDetailing</option>
            <option>Emailer</option>
            <option>Landing Page</option>
            <option>RMC</option>
          </select>
        </label>

        {/* BU Selector************************************************************ */}
        <select
          className="buSelector"
          name="bu"
          id="bu"
          onChange={(e) => setBu(e.target.value)}
        >
          <option value="asc">ASC</option>
          <option value="ail">AIL</option>
          <option value="apc">APC</option>
        </select>
      </div>
    </div>
  );
};

export default Calendar;

//Fetches tasks from the backend as per the selected option and then plot them on the calendar