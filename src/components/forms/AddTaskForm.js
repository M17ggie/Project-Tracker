import "./TaskForm.css";
import "./AddTaskForm.css";
import axios from "axios";
import { useState, useEffect } from "react";
import emailjs from 'emailjs-com';
import React, { useRef } from 'react';
import Navbar from "../Navbar";
import LoadingSpinner from "../UI/LoadingSpinner";


function AddTaskForm(props) {

  //setting page title*********************************************************
  useEffect(() => {
    document.title = "Add Task";
  }, []);

  const [bu, setBu] = useState();
  const [division, setDivision] = useState();
  const [divisionArray, setDivisionArray] = useState([]);
  const [receivedDate, setReceivedDate] = useState();
  const [etaBase, setEtaBase] = useState();
  const [activityType, setActivityType] = useState();
  const [staticSlides, setStaticSlides] = useState(0);
  const [vaHide, setVaHide] = useState(true);
  const [staticHide, setStaticHide] = useState(true);
  const [interactiveSlides, setInteractiveSlides] = useState(0);
  const [interactiveHide, setInteractiveHide] = useState(true);
  const [adaptionSlides, setAdaptionSlides] = useState(0);
  const [adaptionHide, setAdaptionHide] = useState(true);
  const [customPages, setCustomPages] = useState(0);
  const [customHide, setCustomHide] = useState(true);
  const [va, setVa] = useState(0);
  const [staticPages, setStaticPages] = useState(0);
  const [emailPageSwitch, setEmailPageSwitch] = useState();
  const [staticPageHide, setStaticPageHide] = useState(true);
  const [totalHours, setTotalHours] = useState();
  const [totalDays, setTotalDays] = useState();
  const [taskName, setTaskName] = useState();
  const [emailerHide, setEmailerHide] = useState(true);
  const [landingHide, setLandingHide] = useState(true);
  const [nameSwitch, setNameSwitch] = useState();
  const [emailerType, setEmailerType] = useState("Custom");
  const [landingPages, setLandingPages] = useState();
  const [emailerSubject, setEmailerSubject] = useState();
  const [addLink, setAddLink] = useState();
  const [priority, setPriority] = useState("Regular");
  const [status, setStatus] = useState("Not Initiated");
  const [calcEta, setCalcEta] = useState(true);
  const [expectedDelivery, setExpectedDelivery] = useState();
  const [expectedDeliveryArray, setExpectedDeliveryArray] = useState([]);
  const [vistaarSpoc, setVistaarSpoc] = useState("Lisa");
  const [vistaarDevelopers, setvistaarDevelopers] = useState("Akhil");
  const [developersEmail, setDevelopersEmail] = useState("akhil.semwal@vistaarmedia.com");
  const [buSpoc, setBuSpoc] = useState();
  const [comments, setComments] = useState();
  const [isInProgress, setIsInProgress] = useState(false);
  const [statusArray, setStatusArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  const today = new Date();
  const defaultDate = new Date(today).toISOString().split('T')[0];
  // console.log(defaultDate);

  const id = Math.floor(Math.random() * 1e7).toString(16)

  const buUpdate = (e) => {
    setBu(e.target.value);
    if (e.target.value === "ail") setDivisionArray(props.ailDivision);
    else if (e.target.value === "asc") setDivisionArray(props.ascDivision);
    else if (e.target.value === "apc") setDivisionArray(props.apcDivision);
  };

  // to set brand name *******************************************************
  const divisionUpdate = (e) => {
    setDivision(e.target.value);
    statusArray.forEach((status) => {
      if (status === "In Progress") setIsInProgress(true);
    });
  };

  // to set up received date ************************************************
  const receivedDateUpdate = (e) => {
    setReceivedDate(e.target.value);
  };


  // compares two dates and returns farthest date **************************************

  function dateCompare(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    if (date1 > date2) {
      return date1;
    } else if (date1 < date2) {
      return date2;
    } else {
      return date1;
    }
  }

  function maxDeliveryDate(arr) {
    let etaBase = new Date();
    arr.forEach((date) => {
      let tempDate = new Date(date);
      etaBase = dateCompare(tempDate, etaBase);
    });
    return etaBase;
  }

  // to set up activity type***********************************
  const activityTypeUpdate = (e) => {
    setActivityType(e.target.value);
    setEtaBase(maxDeliveryDate(expectedDeliveryArray));
    if (e.target.value === "Edetailing") {
      setVaHide(false);
      setStaticHide(false);
      setInteractiveHide(false);
      setAdaptionHide(false);
      setStaticPageHide(true);
      setCustomHide(true);
      setEmailerHide(true);
      setLandingHide(true);
      setNameSwitch("Task");
    } else if (e.target.value === "Emailer") {
      setVaHide(true);
      setStaticHide(true);
      setInteractiveHide(true);
      setAdaptionHide(true);
      setStaticPageHide(false);
      setCustomHide(false);
      setEmailerHide(false);
      setLandingHide(true);
      setNameSwitch("Emailer");
      setEmailPageSwitch("Email");
    } else if (e.target.value === "Landing Page") {
      setVaHide(true);
      setStaticHide(true);
      setInteractiveHide(true);
      setAdaptionHide(true);
      setStaticPageHide(false);
      setCustomHide(false);
      setEmailerHide(false);
      setLandingHide(false);
      setNameSwitch("Landing Page");
      setEmailPageSwitch("Page");
    } else if (e.target.value === "RMC") {
      setVaHide(true);
      setStaticHide(false);
      setInteractiveHide(false);
      setAdaptionHide(false);
      setStaticPageHide(true);
      setCustomHide(true);
      setEmailerHide(true);
      setNameSwitch("Task Name");
    }
  };

  /* 
    Static 1 hour
    Interactive 2 hours
    Adaption 1hour
    Static Emailer 2 hours
    Custom Emailer 4 hours
  */

  // to calculate estimated task time *********************************************
  const taskTimeCalc = (
    staticSlides,
    interactiveSlides,
    adaptionSlides,
    staticPages,
    customPages
  ) => {
    let timeHours =
      1 * staticSlides +
      2 * interactiveSlides +
      1 * adaptionSlides +
      2 * staticPages +
      4 * customPages;

    // setting total hours amd total days*********************************************************
    setTotalHours(timeHours);
    setTotalDays(Math.ceil(timeHours / 8));
    if (calcEta) {
      var tempDate = new Date(etaBase);
      tempDate.setDate(tempDate.getDate() + Math.ceil(timeHours / 8));
      setExpectedDelivery(tempDate);
    }
  };

  const priorityUpdate = (e) => {
    setPriority(e.target.value);
  };

  const statusUpdate = (e) => {
    setStatus(e.target.value);
    if (
      e.target.value === "Awaiting Artwork" ||
      e.target.value === "Awaiting Animation Guidelines"
    ) {
      setCalcEta(false);
      setExpectedDelivery();
    } else setCalcEta(true);
  };

  // to set-up VA Update***********************************
  const vaUpdate = (e) => {
    setVa(e.target.value)
  }

  const staticSlidesUpdate = (e) => {
    setStaticSlides(e.target.value);
    taskTimeCalc(
      e.target.value,
      interactiveSlides,
      adaptionSlides,
      staticPages,
      customPages
    );
  };

  const interactiveSlidesUpdate = (e) => {
    setInteractiveSlides(e.target.value);
    taskTimeCalc(
      staticSlides,
      e.target.value,
      adaptionSlides,
      staticPages,
      customPages
    );
  };

  const adaptionSlidesUpdate = (e) => {
    setAdaptionSlides(e.target.value);
    taskTimeCalc(
      staticSlides,
      interactiveSlides,
      e.target.value,
      staticPages,
      customPages
    );
  };

  const staticPagesUpdate = (e) => {
    setStaticPages(e.target.value);
    taskTimeCalc(
      staticSlides,
      interactiveSlides,
      adaptionSlides,
      e.target.value,
      customPages
    );
  };

  const customPagesUpdate = (e) => {
    setCustomPages(e.target.value);
    taskTimeCalc(
      staticSlides,
      interactiveSlides,
      adaptionSlides,
      staticPages,
      e.target.value
    );
  };

  const taskNameUpdate = (e) => {
    setTaskName(e.target.value);
  };

  const emailerSubjectUpdate = (e) => {
    setEmailerSubject(e.target.value);
  };

  const addLinkUpdate = (e) => {
    setAddLink(e.target.value);
  };

  const vistaarSpocUpdate = (e) => {
    setVistaarSpoc(e.target.value);
  };

  const vistaarDevelopersUpdate = (e) => {
    setvistaarDevelopers(e.target.value);

    if (e.target.value === "Akhil") {
      setDevelopersEmail("akhil.semwal@vistaarmedia.com");
    }
    else if (e.target.value === "Akilesh") {
      setDevelopersEmail("akilesh.natekar@vistaarmedia.com");
    }
    else if (e.target.value === "Harsh") {
      setDevelopersEmail("harsh.singh@vistaarmedia.com");
    }
    else if (e.target.value === "Kshitija") {
      setDevelopersEmail("kshitija.patil@vistaarmedia.com");
    }
    else if (e.target.value === "Manish") {
      setDevelopersEmail("manish.gupta@vistaarmedia.com");
    }
    else if (e.target.value === "Raj") {
      setDevelopersEmail("raj.mhatre@vistaarmedia.com");
    }
    else if (e.target.value === "Rajvee") {
      setDevelopersEmail("rajvi.goda@vistaarmedia.com");
    }
    else if (e.target.value === "Snehal") {
      setDevelopersEmail("snehal.patel@vistaarmedia.com");
    }
  };
  const developersEmailUpdate = (e) => {
    setDevelopersEmail(e.target.value);
  };
  // console.log({ developersEmail });

  const buSpocUpdate = (e) => {
    setBuSpoc(e.target.value);
  };

  const commentsUpdate = (e) => {
    setComments(e.target.value);
  };

  // Submit handler**********************************************************************
  const onSubmitHandler = e => {
    e.preventDefault();

    axios.post(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`, {
      // id: id,
      "Division": division,
      "Received Date": defaultDate,
      "Start Date": etaBase,
      "Activity Type": activityType,
      "Number of VAs": va,
      "Static Slides": staticSlides,
      "Interactive Slides": interactiveSlides,
      "Adaption Slides": adaptionSlides,
      "Emailer Type": emailerType,
      "Number of Pages": landingPages,
      // "Static Pages": staticPages,
      "Task Name": taskName,
      "Emailer Subject": emailerSubject,
      "Add Link": addLink,
      "Priority": priority,
      "Status": status,
      // "totalHours": totalHours,
      // "totalDays": totalDays,
      // "Expected Delivery": " ",
      "Vistaar SPOC": vistaarSpoc,
      "Vistaar Developers": vistaarDevelopers,
      "BU SPOC": buSpoc,
      "Comments": comments
    })
      .then(() => {
        alert("task added");
        setIsLoading(false);

        // if task addition is successful, send email***************************
        emailjs.sendForm('service_lvwjbdy', 'template_yh8m339', form.current, 'eM_eL4AWw_wnjD89_')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(`Something went wrong and we couldn't add the task. Please try again`)
        setIsLoading(false);
      });

    // console.log({
    //   // id: id,
    //   "Division": division,
    //   "Received Date": defaultDate,
    //   "Start Date": etaBase,
    //   "Activity Type": activityType,
    //   "Number of VAs": va,
    //   "Static Slides": staticSlides,
    //   "Interactive Slides": interactiveSlides,
    //   "Adaption Slides": adaptionSlides,
    //   "Emailer Type": emailerType,
    //   "Number of Pages": landingPages,
    //   // "Static Pages": staticPages,
    //   "Task Name": taskName,
    //   "Emailer Subject": emailerSubject,
    //   "Add Link": addLink,
    //   "Priority": priority,
    //   "Status": status,
    //   // "totalHours": totalHours,
    //   // "totalDays": totalDays,
    //   // "Expected Delivery": " ",
    //   "Vistaar SPOC": vistaarSpoc,
    //   "Vistaar Developers": vistaarDevelopers,
    //   "BU SPOC": buSpoc,
    //   "Comments": comments
    // })

    //resetting input fields
    setDivision("")
    setActivityType("")
    setVa("")
    setStaticSlides("");
    setInteractiveSlides("")
    setAdaptionSlides("")
    setCustomPages("")
    setStaticPages("")
    setTaskName("")
    setEmailerSubject("")
    setAddLink("")
    setPriority("Regular")
    setStatus("Not Initiated")
    setVistaarSpoc("Lisa")
    setvistaarDevelopers("akhil")
    setDevelopersEmail("akhil.semwal@vistaarmedia.com")
    setBuSpoc("")
    setComments("")
  };


  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs.sendForm('service_lvwjbdy', 'template_yh8m339', form.current, 'eM_eL4AWw_wnjD89_')
  //     .then((result) => {
  //         console.log(result.text);
  //     }, (error) => {
  //         console.log(error.text);
  //     });
  // };

  return (
    <>
      <Navbar />
      {isLoading && <LoadingSpinner />}
      {!isLoading && <div className="formContainer">
        <h1>Add New Task Form</h1>
        <form ref={form} className="form" onSubmit={onSubmitHandler}>
          <label htmlFor="bu">BU:</label>
          <select id="bu" name="bu" defaultValue={""} required onChange={buUpdate}>
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option value="apc">APC</option>
            <option value="asc">ASC</option>
            <option value="ail">AIL</option>
          </select>

          <label htmlFor="division">Division:</label>
          <select
            defaultValue={""}
            id="division"
            name="division"
            onChange={divisionUpdate}
            disabled={!bu}
            required
            value={division}
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            {divisionArray.map((div, index) => (
              <option value={div} key={index}>
                {div}
              </option>
            ))}
          </select>



          <label htmlFor="receivedDate">Received Date:</label>
          <input
            id="receivedDate"
            type="date"
            disabled={true}
            defaultValue={defaultDate}
          />

          <label>Activity Type:</label>
          <select
            name="activityType"
            defaultValue={""}
            required
            value={activityType}
            onChange={activityTypeUpdate}
            disabled={!division}
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option>Edetailing</option>
            <option>Emailer</option>
            <option>Landing Page</option>
            <option>RMC</option>
          </select>

          <label htmlFor="">Priority:</label>
          <select
            defaultValue={"Regular"}
            required
            onChange={priorityUpdate}
            disabled={!division}
          >
            <option value="Regular">Regular</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="">Status:</label>
          <select
            defaultValue={"Not Initiated"}
            required
            value={status}
            onChange={statusUpdate}
            disabled={!division}
          >
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option>Not Initiated</option>
            <option disabled={isInProgress}>In Progress</option>
            <option>On Hold</option>
            <option>Test Link Shared</option>
            <option>Uploaded to Sandbox</option>
            <option>Uploaded to Production</option>
            <option>Feedback In Progress</option>
            <option>Cancelled</option>
          </select>

          {nameSwitch && <label htmlFor="">{nameSwitch} Name:</label>}
          {nameSwitch && (
            <input type="text" name="taskName" required onChange={taskNameUpdate} />
          )}

          <label htmlFor="" hidden={emailerHide}>
            {nameSwitch} Subject:
          </label>
          <input
            type="text"
            value={emailerSubject}
            hidden={emailerHide}
            onChange={emailerSubjectUpdate}
            required={!emailerHide}
            name="emailerSub"
          />

          <label htmlFor="" hidden={vaHide}>
            Number of VAs:
          </label>
          <input
            type="number"
            min="0"
            onChange={vaUpdate}
            hidden={vaHide}
            value={va}
          />


          <label htmlFor="" hidden={staticHide}>
            Static Slides:
          </label>
          <input
            type="number"
            min="0"
            onChange={staticSlidesUpdate}
            hidden={staticHide}
            value={staticSlides}
          />

          <label htmlFor="" hidden={interactiveHide}>
            Interactive Slides:
          </label>
          <input
            type="number"
            min="0"
            onChange={interactiveSlidesUpdate}
            hidden={interactiveHide}
            value={interactiveSlides}
          />

          <label htmlFor="" hidden={adaptionHide}>
            Adaption Slides:
          </label>
          <input
            type="number"
            value={adaptionSlides}
            min="0"
            onChange={adaptionSlidesUpdate}
            hidden={adaptionHide}
          />

          <label htmlFor="" hidden={emailerHide || landingHide}>
            {nameSwitch} type:
          </label>
          <select hidden={emailerHide || landingHide} value={emailerType} onChange={(e) => { setEmailerType(e.target.value) }}>
            <option>Custom</option>
            <option>Static</option>
          </select>
          {/* <input
            type="number"
            defaultValue="0"
            min="0"
            onChange={staticPagesUpdate}
            hidden={staticPageHide}
          /> */}

          {/* <label htmlFor="" hidden={customHide}>
            Number of pages:
          </label>
          <input required
            type="number"
            defaultValue="0"
            min="0"
            onChange={(e) => { setLandingPages(e.target.value) }}
            hidden={customHide}
          /> */}

          {/* {totalHours ? (
            <div className="timeContainer">
              <label htmlFor="taskTime" className="taskTime">
                Total Time Required: <span>{totalHours} hours</span>
              </label>
              {totalDays && (
                <label htmlFor="taskTime" className="taskTime">
                  Total Days Required: <span>{totalDays} day(s)</span>
                </label>
              )}
              {etaBase && (
                <label htmlFor="startDate" className="taskTime">
                  Start Date:{" "}
                  <span>
                    {`${etaBase.getDate()}  ${etaBase.toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )} ${etaBase.getFullYear()}`}
                  </span>
                </label>
              )}
              {expectedDelivery && (
                <label htmlFor="expectedDelivery" className="taskTime">
                  Expected Delivery:{" "}
                  <span>
                    {`${expectedDelivery.getDate()}  ${expectedDelivery.toLocaleString(
                      "default",
                      { month: "long" }
                    )} ${expectedDelivery.getFullYear()}`}
                  </span>
                </label>
              )}
            </div>
          ) : (
            ""
          )} */}

          <label htmlFor="" hidden={emailerHide}>
            Links to add:
          </label>
          <input value={addLink} type="text" name="linkToAdd" hidden={emailerHide} onChange={addLinkUpdate} />

          <label htmlFor="vistaarSpoc">Vistaar SPOC:</label>
          <select
            disabled={!division}
            required
            onChange={vistaarSpocUpdate}
            name="vistaarSpoc"
          >
            <option value={vistaarSpoc} disabled hidden>
              Select an Option
            </option>
            <option>Lisa</option>
            <option>Neelam</option>
            <option>Ramakash</option>
            <option>Vanessa</option>
          </select>

          <label htmlFor="vistaarDevelopers">Developers Name:</label>
          <select
            disabled={!division}
            value={vistaarDevelopers}
            required
            onChange={vistaarDevelopersUpdate}
            id="vistaarDevelopers"
            name="vistaarDevelopers"
          >
            <option disabled hidden>
              Select an Option
            </option>
            <option>Akhil</option>
            <option>Akilesh</option>
            <option>Harsh</option>
            <option>Kshitija</option>
            <option>Manish</option>
            <option>Raj</option>
            <option>Rajvee</option>
            <option>Snehal</option>
          </select>

          <label htmlFor="developersEmail">Developer's Email ID: </label>
          <input
            type="text"
            value={developersEmail}
            disabled={!division}
            id="developersEmail"
            name="developersEmail"
          />


          <label htmlFor="">BU SPOC:</label>
          <input
            type="text"
            required
            value={buSpoc}
            onChange={buSpocUpdate}
            disabled={!division}
            name="buSpoc"
          />

          <label htmlFor="comments">Comments:</label>
          <textarea
            value={comments}
            onChange={commentsUpdate}
            name=""
            disabled={!division}
          ></textarea>

          <button disabled={!division} className="btnSubmit" type="submit">
            Add Task
          </button>
        </form>

      </div>}
    </>
  );
}

export default AddTaskForm;
