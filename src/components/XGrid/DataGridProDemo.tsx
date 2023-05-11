import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridToolbar,
} from "@mui/x-data-grid-pro";
import { IEmployee, cityOptions, columns, rowData } from "./GridColumns";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useState } from "react";
import { useGridApiRef } from '@mui/x-data-grid-pro'

export default function DataGridProDemo() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100000,
    maxColumns: 10,
  });

  const [value, setValue] = useState<IEmployee>();
  const apiRef = useGridApiRef();

  return (
    <Box sx={{ maxHeight: "200px", width: "100%" }}>
      <Grid container item sx={{ padding: "10px 20px" }}>
        <DataGridPro
          apiRef={apiRef}
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
          slotProps={{ toolbar: GridToolbar }}
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
      <Grid item sx={{ height: '50px' }}>{JSON.stringify(value)}</Grid>
      <Grid item sx={{ height: '50px' }}>
        <Autocomplete
          options={cityOptions}
          fullWidth
          autoHighlight
          renderInput={params => <TextField {...params} />}
        />
      </Grid>
    </Box>
  );
}
