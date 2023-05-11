import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-pro'

interface AutocompleteEditInputCellProps {
    params: GridRenderEditCellParams,
    options: any[] | undefined,
    freeSolo?: boolean,
    multiple?: boolean,
    getOptionLabel?: (option: any) => string
}

export function AutocompleteEditInputCell(props: AutocompleteEditInputCellProps) {
    const { params, options } = props;
    const apiRef = useGridApiContext();


    const handleChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: any) => {
        if (event) {
            apiRef.current.setEditCellValue({ id: params.id, field: params.field, value: newValue.value });
        }
    }, [params.id, params.field]);

    const getValue = useCallback(() => {
        if (params.value && options)
            return options?.find(e => e.value === params.value);

        return null;
    }, [params.value]);

    return (
        <Autocomplete
            value={getValue()}
            onChange={handleChange}
            onInputChange={(event, value) => handleChange(event, value)}
            fullWidth
            options={options ?? []}
            autoHighlight
            renderInput={(inputParams) => <TextField {...inputParams} error={params.error} />}
            getOptionLabel={option => option.value}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            open
        />
    );
}