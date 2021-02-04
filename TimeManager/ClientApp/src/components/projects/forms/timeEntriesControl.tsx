import { Button, FormControl, makeStyles, Paper, TextField } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppState, ProjectTimeEntry } from '../../../models';
import TimeEntriesList from './timeEntriesList';

export interface IFormPart {
    formData: any
}

const useStyles = makeStyles({
    iconBtn: {
        height: '56px'
    }
});

const TimeEntriesControl: React.FC<IFormPart> = (props: IFormPart) => {
    const [editedEntry, setEditedEntry] = useState<ProjectTimeEntry>();
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [invalidDates, setInvalidDates] = useState<boolean>(true);

    const classes = useStyles();

    useEffect(() => {
        validateDates();
    }, [startDate, endDate]);

    const validateDates = () => {
        setInvalidDates(!Boolean(startDate) || !Boolean(endDate));
    };

    const setDates = (start: Date | null, end: Date | null) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleAdd = () => {
        let timeEntries: any[] = [];

        timeEntries = [...props.formData.values.projectTimeEntries]

        const newEntry = new ProjectTimeEntry();
        newEntry.startDate = startDate;
        newEntry.endDate = endDate;
        timeEntries.push(newEntry);

        props.formData.setFieldValue('projectTimeEntries', timeEntries);
        props.formData.setFieldTouched('projectTimeEntries');

        setDates(null, null);
    };

    const tryParseDate = (date: string) => {
        return new Date(date ?? '');
    };

    const handleTimeEntryDelete = (timeEntry: ProjectTimeEntry) => {
        let timeEntries: any[] = props.formData.values.projectTimeEntries.filter(item => item !== timeEntry);
        props.formData.setFieldValue('projectTimeEntries', timeEntries);
        props.formData.setFieldTouched('projectTimeEntries');
    };

    return (
        <>
            <FormControl>
                <TextField
                    fullWidth
                    id="startTime"
                    name="startTime"
                    label="Start Time"
                    variant="outlined"
                    type="datetime-local"
                    onChange={(args: any) => setStartDate(tryParseDate(args?.target?.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
            </FormControl>
            &nbsp;
            <FormControl>
                <TextField
                    fullWidth
                    id="endTime"
                    name="endTime"
                    label="End Time"
                    variant="outlined"
                    type="datetime-local"
                    onChange={(args: any) => setEndDate(new Date(args?.target?.value ?? ''))}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
            </FormControl>
            &nbsp;
            <FormControl>
                <Button
                    className={classes.iconBtn}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={invalidDates}
                    onClick={() => handleAdd()}>
                    Add
                </Button>
            </FormControl>

        <TimeEntriesList formData={props.formData} delete={handleTimeEntryDelete} />
        </>
    )
}

export default TimeEntriesControl;