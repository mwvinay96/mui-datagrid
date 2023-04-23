import { TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";

const countryOptions = [
  {
    id: 1,
    label: "India",
    value: "India",
  },
  {
    id: 2,
    label: "USA",
    value: "USA",
  },
  {
    id: 3,
    label: "Canada",
    value: "Canada",
  },
];

const cityOptions = [
  {
    id: 1,
    label: "Bengaluru",
    value: "Bengaluru",
    country: "India",
  },
  {
    id: 2,
    label: "Hyderabad",
    value: "Hyderabad",
    country: "India",
  },
  {
    id: 3,
    label: "Delhi",
    value: "Delhi",
    country: "India",
  },
  {
    id: 4,
    label: "Texas",
    value: "Texas",
    country: "USA",
  },
  {
    id: 5,
    label: "Washington DC",
    value: "Washington DC",
    country: "USA",
  },
  {
    id: 6,
    label: "Ontario",
    value: "Ontario",
    country: "Canada",
  },
];

export const columns: GridColDef[] = [
  { headerName: "Id", field: "id", editable: true, filterable: true },
  { headerName: "User Name", field: "name", editable: true, filterable: true },
  { headerName: "Designation", field: "designation", editable: true },
  { headerName: "Date of Birth", field: "dob", editable: true, type: "date" },
  {
    headerName: "Country",
    field: "country",
    editable: true,
    type: "singleSelect",
    valueOptions: countryOptions,
  },
  {
    headerName: "City",
    field: "city",
    editable: true,
    type: "singleSelect",
    valueOptions(params) {
      return cityOptions.filter((e) => params.row?.country === e.country);
    },
  },
];

export interface IEmployee {
  id: number;
  name: string;
  designation: string;
  dob: Date;
  country: string;
  city: string;
}

export const rowData: IEmployee[] = [
  {
    id: 1,
    name: "Vinay",
    designation: "Senior Consultant 2",
    dob: new Date("04/28/1996"),
    country: "India",
    city: "Bengaluru",
  },
  {
    id: 2,
    name: "Kevin",
    designation: "Senior Consultant 1",
    dob: new Date("02/01/1997"),
    country: "India",
    city: "Delhi",
  },
  {
    id: 3,
    name: "Jonathan",
    designation: "Senior Consultant 1",
    dob: new Date("02/01/1997"),
    country: "USA",
    city: "Texas",
  },
];

const EditableCell = (props: any) => {
  const [value, setValue] = useState(props.formattedValue);

  useEffect(() => {}, []);

  return (
    <TextField
      value={value}
      placeholder={`Please enter ${props.field}`}
      onChange={(event) => {
        console.log("onChangeEvent");
      }}
      onKeyDown={(event) => {
        console.log(event);
        if (event.code === "Space") {
          setValue(value + " ");
          event.stopPropagation();
        }
      }}
    />
  );
};
