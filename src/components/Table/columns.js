import {
  divisionFilter,
  activityFilter,
  statusFilter,
  priorityFilter,
  commonFilter,
  emailerFilter
} from "./columnFilters";

function readableDate(date) {
  return date
    ? new Date(date).getDate() +
    " " +
    new Date(date).toLocaleString("default", { month: "long" }) +
    " " +
    new Date(date).getFullYear()
    : "";
}
//to update table row


//react-table follows specific structure.
//Header is the title of the column.

//accessor can be both function or property. When provided a string, it will access that function/property
// from the response data

export const COLUMNS = [
  {
    Header: 'ID',
    id: "id",
    accessor: "id",
    Filter: commonFilter
  },
  {
    Header: "Division",
    accessor: "Division",
    Filter: divisionFilter,
  },
  {
    Header: "Received Date",
    accessor: "Received Date",
    Cell: ({ value }) => {
      return readableDate(value);
    },
    Filter: commonFilter,
  },
  // {
  //   Header: "Start Date",
  //   accessor: "startDate",
  //   Cell: ({ value }) => {
  //     return readableDate(value);
  //   },
  //   Filter: commonFilter,
  // },
  {
    Header: "Activity Type",
    accessor: "Activity Type",
    Filter: activityFilter,
  },
  {
    Header: "Number of VAs",
    accessor: "Number of VAs",
    Filter: commonFilter,
  },
  {
    Header: "Static Slides",
    accessor: "Static Slides",
    Filter: commonFilter,
  },
  {
    Header: "Interactive Slides",
    accessor: "Interactive Slides",
    Filter: commonFilter,
  },
  {
    Header: "Adaption Slides",
    accessor: "Adaption Slides",
    Filter: commonFilter,
  },
  {
    Header: "Emailer/Landing Page Type",
    accessor: "Emailer Type",
    Filter: emailerFilter,
  },
  // {
  //   Header: "Number of Pages",
  //   accessor: "Number of Pages",
  //   Filter: commonFilter,
  // },
  // {
  //   Header: "Total Hours",
  //   accessor: "totalHours",
  //   Filter: commonFilter,
  // },
  // {
  //   Header: "Total Days",
  //   accessor: "totalDays",
  //   Filter: commonFilter,
  // },
  {
    Header: "Task/Emailer/Landing Page Name",
    accessor: "Task Name",
    Filter: commonFilter,
  },
  {
    Header: "Emailer/Landing Page Subject",
    accessor: "Emailer Subject",
    Filter: commonFilter,
  },
  {
    Header: "Add Link",
    accessor: "Add Link",
    Filter: commonFilter,
  },
  {
    Header: "Priority",
    accessor: "Priority",
    Filter: priorityFilter,
  },
  {
    Header: "Status",
    accessor: "Status",
    Filter: statusFilter,
  },
  {
    Header: "Final Delivery",
    accessor: "Final Delivery",
    Cell: ({ value }) => {
      return readableDate(value);
    },
    Filter: commonFilter,
  },
  {
    Header: "Vistaar SPOC",
    accessor: "Vistaar SPOC",
    Filter: commonFilter,
  },
  {
    Header: "BU SPOC",
    accessor: "BU SPOC",
    Filter: commonFilter,
  },
  {
    Header: "Comments",
    accessor: "Comments",
    Filter: commonFilter,
  }
];
