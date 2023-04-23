import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridToolbar,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import { IEmployee, columns, rowData } from "./GridColumns";
import { Grid } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import React, { useState } from "react";

export default function DataGridProDemo() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100000,
    maxColumns: 10,
  });

  const [value, setValue] = useState<IEmployee>();

  return (
    <Box sx={{ maxHeight: "200px", width: "100%" }}>
      <Grid container item sx={{ padding: "10px 20px" }}>
        <DataGridPro
          processRowUpdate={(newRow: IEmployee, oldRow: IEmployee) => {
            setValue(newRow);
            return newRow;
          }}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 2,
              },
            },
          }}
          components={{ Toolbar: GridToolbar }}
          onProcessRowUpdateError={(error) => console.log(error)}
          columns={columns}
          rows={rowData}
          editMode="cell"
          experimentalFeatures={{ columnGrouping: true }}
          getRowId={(row: IEmployee) => row.id}
          rowsLoadingMode="server"
          pagination
          paginationMode="client"
          pageSizeOptions={[1, 2, 3, 100]}
        />
      </Grid>
      <Grid item>{JSON.stringify(value)}</Grid>
    </Box>
  );
}
