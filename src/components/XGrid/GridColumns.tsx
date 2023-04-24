import { TextField, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import { GridColDef, GridEditInputCell, GridRenderEditCellParams } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import { differenceInCalendarYears } from 'date-fns'

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
  {
    headerName: "Date of Birth", field: "dob", editable: true, type: "date", preProcessEditCellProps(params) {
      if (differenceInCalendarYears(new Date(), params.props.value) < 21) { return { ...params.props, error: true } }
      return { ...params.props, error: false }
    },
  },
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

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function renderEditAge(params: GridRenderEditCellParams) {
  return <NameEditInputCell {...params} />;
}

function NameEditInputCell(props: GridRenderEditCellParams) {
  const { error } = props;

  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}



function validateName(username: string): Promise<boolean> {
  const existingUsers = rows.map((row) => row.name.toLowerCase());

  return new Promise<any>((resolve) => {
    promiseTimeout = setTimeout(() => {
      const exists = existingUsers.includes(username.toLowerCase());
      resolve(exists ? `${username} is already taken.` : null);
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

