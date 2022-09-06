import "./TaskForm.css";
import "./UpdateTaskForm.css";
import axios from "axios";
import { useState } from "react";
import Navbar from "../Navbar";
import Loading from "../UI/Loading";

function UpdateTaskForm(props) {
  const [bu, setBu] = useState("");
  const [division, setDivision] = useState();
  const [divisionArray, setDivisionArray] = useState([]);
  const [activityType, setActivityType] = useState();
  const [taskName, setTaskName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [taskNameArray, setTaskNameArray] = useState([]);
  const [staticSlides, setStaticSlides] = useState();
  const [staticHide, setStaticHide] = useState(true);
  const [interactiveSlides, setInteractiveSlides] = useState();
  const [interactiveHide, setInteractiveHide] = useState(true);
  const [adaptionSlides, setAdaptionSlides] = useState();
  const [adaptionHide, setAdaptionHide] = useState(true);
  const [customPages, setCustomPages] = useState(0);
  const [customHide, setCustomHide] = useState(true);
  const [staticPages, setStaticPages] = useState();
  const [emailPageSwitch, setEmailPageSwitch] = useState();
  const [staticPageHide, setStaticPageHide] = useState(true);
  const [emailerHide, setEmailerHide] = useState(true);
  const [nameSwitch, setNameSwitch] = useState();
  const [emailerSubject, setEmailerSubject] = useState();
  const [addLink, setAddLink] = useState();
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState();
  const [fetchedObject, setFetchedObject] = useState({});
  const [display, setDisplay] = useState("none");
  const [comments, setComments] = useState();
  const [expectedDelivery, setExpectedDelivery] = useState();
  const [totalHours, setTotalHours] = useState();
  const [totalDays, setTotalDays] = useState();
  const [calcEta, setCalcEta] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [statusArray, setStatusArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  // to store firebase key
  const [key, setKey] = useState(null)
  const buUpdate = (e) => {
    setBu(e.target.value);
    if (e.target.value === "ail") setDivisionArray(props.ailDivision);
    else if (e.target.value === "asc") setDivisionArray(props.ascDivision);
    else if (e.target.value === "apc") setDivisionArray(props.apcDivision);
    // axios
    //   .get(`http://localhost:7000/${e.target.value}/etaFetch`)
    //   .then((res) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // axios
    //   .get(`http://localhost:7000/${e.target.value}/statusFetch`)
    //   .then((res) => {
    //     setStatusArray(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // const taskNameArrayPopulate = async (div, type) => {
  //   //populates task name array for task name conditional dropdown
  //   await axios
  //     .get(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`)
  //     .then((response) => {
  //       // setTaskNameArray([]);
  //       // console.log('response',response);
  //       const data=[];
  //       for(const key in response.data){
  //         const dataObj = {
  //           id: key,
  //           ...response.data[key]
  //         }
  //         data.push(dataObj)
  //       }
  //       data.forEach((data) => {
  //         if (data.division === div && data.activityType === type)
  //           setTaskNameArray((arr) => [...arr, data.taskName]);
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  const taskNameArrayPopulate = async (div, type) => {
    //populates task name array for task name conditional dropdown
    await axios
      .get(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`)
      .then((response) => {
        // setTaskNameArray([]);
        // console.log('response',response);
        const data=[];
        for(const key in response.data){
          const dataObj = {
            id: key,
            ...response.data[key]
          }
          data.push(dataObj)
        }
        console.log(data)
        data.forEach((data) => {
          if (data.division === div && data.activityType === type)
          setTaskNameArray((arr) => [...arr, {name: data.taskName, id: data.id}]);
        });
      })
      .catch((err) => console.log(err));
  };

  const divisionUpdate = (e) => {
    setDivision(e.target.value);
    taskNameArrayPopulate(e.target.value, activityType);
    statusArray.forEach((status) => {
      if (status === "In Progress") setIsInProgress(true);
    });
  };

  const activityTypeUpdate = (e) => {
    setActivityType(e.target.value);
    taskNameArrayPopulate(division, e.target.value);
    if (e.target.value === "Edetailing") {
      setStaticHide(false);
      setInteractiveHide(false);
      setAdaptionHide(false);
      setStaticPageHide(true);
      setCustomHide(true);
      setEmailerHide(true);
      setNameSwitch("Task Name");
    } else if (e.target.value === "Emailer") {
      setStaticHide(true);
      setInteractiveHide(true);
      setAdaptionHide(true);
      setStaticPageHide(false);
      setCustomHide(false);
      setEmailerHide(false);
      setNameSwitch("Emailer Name");
      setEmailPageSwitch("Email");
    } else if (e.target.value === "Landing Page") {
      setStaticHide(true);
      setInteractiveHide(true);
      setAdaptionHide(true);
      setStaticPageHide(false);
      setCustomHide(false);
      setEmailerHide(true);
      setNameSwitch("Task Name");
      setEmailPageSwitch("Page");
    } else if (e.target.value === "RMC") {
      setStaticHide(false);
      setInteractiveHide(false);
      setAdaptionHide(false);
      setStaticPageHide(true);
      setCustomHide(true);
      setEmailerHide(true);
      setNameSwitch("Task Name");
    }
  };

  const taskNameUpdate = (e) => {
    setTaskName(e.target.value);
  };

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
    setTotalHours(timeHours);
    setTotalDays(Math.ceil(timeHours / 8));
    if (calcEta) {
      var tempDate = new Date();
      let x = new Date(fetchedObject?.startDate);
      tempDate.setDate(x.getDate() + Math.ceil(timeHours / 8));
      setExpectedDelivery(tempDate);
    }
  };

  const taskTimeCalcPopulate = (data) => {
    setStaticSlides(data.staticSlides);
    setInteractiveSlides(data.interactiveSlides);
    setAdaptionSlides(data.adaptionSlides);
    setStaticPages(data.staticPages);
    setCustomPages(data.customPages);
    taskTimeCalc(
      data.staticSlides,
      data.interactiveSlides,
      data.adaptionSlides,
      data.staticPages,
      data.customPages
    );
  };

  function readableDate(date) {
    return (
      new Date(date).getDate() +
      " " +
      new Date(date).toLocaleString("default", { month: "long" }) +
      " " +
      new Date(date).getFullYear()
    );
  }

  const newTaskNameUpdate = (e) => {
    setNewTaskName(e.target.value);
  };

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

  const emailerSubjectUpdate = (e) => {
    setEmailerSubject(e.target.value);
  };

  const addLinkUpdate = (e) => {
    setAddLink(e.target.value);
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

  const commentsUpdate = (e) => {
    setComments(e.target.value);
  };

  const fetchTask = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setNewTaskName(taskName);

    // const selectedTaskKey = e.target["taskName"].value.trim();

    await axios
      .get(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}.json`,
       {
       taskName: taskName
      }
      )
      .then((res) => {
        // console.log('response data',res.data);
        //setting firebase key****************************
        // setKey(taskName)
        // console.log(key);
        setFetchedObject(res.data);
        setDisplay("");
        taskTimeCalcPopulate(res.data);
        // setExpectedDelivery(new Date(expectedDelivery));
      })
      .catch((err) => {
        console.log(err);
      });
      setIsLoading(false)
  };

  const onSubmitHandler = async (e) => {
    if (taskName) {
      await axios
        .put(`https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app/${bu}/${key}.json`, {
          findObject: {
            taskName: taskName,
          },
          updateObject: {
            taskName: newTaskName,
            staticSlides: staticSlides,
            interactiveSlides: interactiveSlides,
            adaptionSlides: adaptionSlides,
            priority: priority,
            status: status,
            customPages: customPages,
            staticPages: staticPages,
            emailerSubject: emailerSubject,
            addLink: addLink,
            expectedDelivery: expectedDelivery,
            totalHours: totalHours,
            totalDays: totalDays,
            comments: comments,
          },
        })
        .then((res) => {
          e.preventDefault();
          alert("Successfully Updated");
        })
        .catch((err) => {
          e.preventDefault();
          alert("Failed to Update");
          console.log(err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="formContainer">
        <h1>Update Existing Task Form</h1>
        <form className="form" onSubmit={fetchTask}>
          <h3>Select Task</h3>

          <label>BU:</label>
          <select defaultValue={""} required onChange={buUpdate}>
            <option value="" disabled hidden>
              Select an Option
            </option>
            <option value="apc">APC</option>
            <option value="asc">ASC</option>
            <option value="ail">AIL</option>
          </select>

          <label>Division:</label>
          <select
            defaultValue={""}
            required
            onChange={divisionUpdate}
            disabled={!bu}
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

          <label>Activity Type:</label>
          <select
            defaultValue={""}
            required
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

          {nameSwitch && <label htmlFor="taskName">{nameSwitch}:</label>}
          {nameSwitch && (
            <select
              id="taskName"
              defaultValue={""}
              required
              onChange={taskNameUpdate}
            >
              <option value="" disabled hidden>
                Select an Option
              </option>
              {taskNameArray.map((task, index) => (
                <option key={index} value={task.id}>{task.name}</option>
              ))}
            </select>
          )}
          <button className="btnSubmit">{isLoading ? <Loading /> : 'Fetch Task'}</button>
        </form>

        {/* Submit the task************************************************** */}
        <form
          className="form updateForm"
          style={{ display: display }}
          onSubmit={onSubmitHandler}
        >
          <h3>Update</h3>
          {fetchedObject?.taskName && (
            <div className="taskDetailContainer">
              <span>
                <b>Received Date: </b>{" "}
                {readableDate(fetchedObject?.receivedDate)}
              </span>
              <span>
                <b>Start Date: </b> {readableDate(fetchedObject?.startDate)}
              </span>
              <span>
                <b>Expected Delivery: </b>
                {readableDate(fetchedObject?.expectedDelivery)}
              </span>
            </div>
          )}

          <label htmlFor="newTaskName">{nameSwitch}</label>
          <input
            type="text"
            defaultValue={fetchedObject?.taskName}
            onChange={newTaskNameUpdate}
          />

          <label htmlFor="">Priority:</label>
          <select
            defaultValue={fetchedObject?.priority}
            required
            onChange={priorityUpdate}
          >
            <option value={fetchedObject?.priority} hidden>
              {fetchedObject?.priority}
            </option>
            <option value="Regular">Regular</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="status">Status:</label>
          <select
            defaultValue={fetchedObject?.status}
            id="status"
            required
            onChange={statusUpdate}
          >
            <option value={fetchedObject?.status} hidden>
              {fetchedObject?.status}
            </option>
            <option value="Not Initiated">Not Initiated</option>
            <option value="Awaiting Artwork">Awaiting Artwork</option>
            <option value="Awaiting Animation Guidelines">
              Awaiting Animation Guidelines
            </option>
            <option value="In Progress" disabled={isInProgress}>
              In Progress
            </option>
            <option value="On Hold">On Hold</option>
            <option value="Test Link Shared">Test Link Shared</option>
            <option value="Uploaded to Sandbox">Uploaded to Sandbox</option>
            <option value="Uploaded to Production">
              Uploaded to Production
            </option>
            <option value="Feedback In Progress">Feedback In Progress</option>
          </select>

          <label htmlFor="" hidden={staticHide}>
            Static Slides:
          </label>
          <input
            type="number"
            defaultValue={fetchedObject?.staticSlides}
            onChange={staticSlidesUpdate}
            min="0"
            hidden={staticHide}
            id="staticSlides"
          />

          <label htmlFor="" hidden={interactiveHide}>
            Interactive Slides:
          </label>
          <input
            type="number"
            defaultValue={fetchedObject?.interactiveSlides}
            onChange={interactiveSlidesUpdate}
            min="0"
            hidden={interactiveHide}
            id="interactiveSlides"
          />

          <label htmlFor="" hidden={adaptionHide}>
            Adaption Slides:
          </label>
          <input
            type="number"
            defaultValue={fetchedObject?.adaptionSlides}
            onChange={adaptionSlidesUpdate}
            min="0"
            hidden={adaptionHide}
            id="adaptionSlides"
          />

          <label htmlFor="" hidden={staticPageHide}>
            Static {emailPageSwitch}:
          </label>
          <input
            type="number"
            defaultValue={fetchedObject?.staticPages}
            onChange={staticPagesUpdate}
            min="0"
            hidden={staticPageHide}
            id="staticPages"
          />

          <label htmlFor="" hidden={customHide}>
            Custom {emailPageSwitch}:
          </label>
          <input
            type="number"
            defaultValue={fetchedObject?.customPages}
            onChange={customPagesUpdate}
            min="0"
            hidden={customHide}
            id="customPages"
          />

          <label htmlFor="" hidden={emailerHide} required>
            Emailer Subject:
          </label>
          <input
            type="text"
            hidden={emailerHide}
            defaultValue={fetchedObject?.emailerSubject}
            onChange={emailerSubjectUpdate}
          />

          <label htmlFor="" hidden={emailerHide}>
            Links to add:
          </label>
          <input
            type="text"
            defaultValue={fetchedObject?.addLink}
            hidden={emailerHide}
            onChange={addLinkUpdate}
          />

          <div className="timeContainer">
            {totalHours && (
              <label htmlFor="taskTime" className="taskTime">
                Total Time Required: <span>{totalHours} hours</span>
              </label>
            )}
            {totalDays && (
              <label htmlFor="taskTime" className="taskTime">
                Total Days Required: <span>{totalDays} day(s)</span>
              </label>
            )}
            {fetchedObject?.startDate && (
              <label htmlFor="startDate" className="taskTime">
                Start Date:{" "}
                <span>{readableDate(fetchedObject?.startDate)}</span>
              </label>
            )}
            {expectedDelivery?.getDate() && (
              <label htmlFor="expectedDelivery" className="taskTime">
                New Expected Delivery:{" "}
                <span>{readableDate(expectedDelivery)}</span>
              </label>
            )}
          </div>

          <label htmlFor="comments">Comments:</label>
          <textarea
            onChange={commentsUpdate}
            defaultValue={fetchedObject?.comments}
          ></textarea>
          <button className="btnSubmit" type="submit">
            Update Task
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateTaskForm;
