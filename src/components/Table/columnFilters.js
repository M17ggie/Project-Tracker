import { ascDivision, ailDivision, apcDivision } from "../../App.js";

export const divisionFilter = ({ column }) => {
  let divisionArray = ailDivision;
  const buState = localStorage.getItem("buState");
  if (buState === "ail") divisionArray = ailDivision;
  else if (buState === "asc") divisionArray = ascDivision;
  else if (buState === "apc") divisionArray = apcDivision;
  const { filterValue, setFilter } = column;
  return (
    <span className="filterSpan">
      <select
        defaultValue={""}
        id="division"
        onChange={(e) => setFilter(e.target.value)}
        required
      >
        <option value=''>---Select---</option>
        {divisionArray.map((div, index) => (
          <option value={div} key={index}>
            {div}
          </option>
        ))}
        {/* <option value="asc">ASC</option>
        <option value="apc">APC</option>
        <option value="ail">AIL</option>*/}
      </select>
    </span>
  );
};

export const activityFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="filterSpan">
      <select
        defaultValue={""}
        id="activity"
        onChange={(e) => setFilter(e.target.value)}
        required
      >
        <option value="">---Select---</option>
        <option value="Edetailing">Edetailing</option>
        <option value="Emailer">Emailer</option>
        <option value="Landing Page">Landing Page</option>
        <option value="RMC">RMC</option>

      </select>
    </span>
  );
};

export const statusFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="filterSpan">
      <select
        defaultValue={""}
        id="status"
        onChange={(e) => setFilter(e.target.value)}
        required
      >
        <option value="">---Select---</option>
        <option value="Not Initiated">Not Initiated</option>
        <option value="In Progress">In Progress</option>
        <option value="On Hold">On Hold</option>
        <option value="Test Link Shared">Test Link Shared</option>
        <option value="Uploaded to Sandbox">Uploaded to Sandbox</option>
        <option value="Uploaded to Production">Uploaded to Production</option>
        <option value="Feedback In Progress">Feedback In Progress</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </span>
  );
};

export const priorityFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="filterSpan">
      <select
        defaultValue={""}
        id="status"
        onChange={(e) => setFilter(e.target.value)}
        required
      >
        <option value="">---Select---</option>
        <option value="Regular">Regular</option>
        <option value="High">High</option>
      </select>
    </span>
  );
};

export const emailerFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="filterSpan">
      <select
        defaultValue={""}
        id="emailer"
        onChange={(e) => setFilter(e.target.value)}
        required
      >
        <option value="">---Select---</option>
        <option value="Static">Static</option>
        <option value="Custom">Custom</option>
      </select>
    </span>
  );
};

export const commonFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="filterSpan">
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
