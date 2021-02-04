import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { IAppState, Project } from '../../models';
import { Divider, TableContainer } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { CalculateHoursDifference, FormatDateTime, FormatHoursDifference } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from '../../store/reducers';

const constructStyles = (expanderDisabled) => {
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
            borderBottom: 'unset',
            },
        },
        expanderColor: {
            color: expanderDisabled ? 'inherit' : 'rgba(0, 0, 0, 0.3)'
        },
        cellWithTable: {
            padding: 0
        },
        innerTable: {
            margin: 0
        }
    });

    return useRowStyles();
}

const ProjectTableRow = (props: { row: Project }) => {
    const dispatcher = useDispatch();
    const [open, setOpen] = React.useState(false);
    const selectedProject = useSelector<IAppState, Project>(state => state.projects.selectedProject);
    const { row } = props;
    const anyTimeEntries = row.projectTimeEntries && row.projectTimeEntries.length;
    const isSelectedRow = Boolean(selectedProject) && selectedProject.id === row.id;

    const classes = constructStyles(anyTimeEntries);

    const handleCollapse = (data) => {
        if(anyTimeEntries) {
            setOpen(!open);
        }
    }

    const handleRowClick = () => {
        if(isSelectedRow) {
            dispatcher(projectsActions.selectProject(null));
        } else {
            dispatcher(projectsActions.selectProject(row));
        }
    };

    const calculateTotalTime = (project: Project) => {
        let totalHours: number = 0;

        if(project.projectTimeEntries && project.projectTimeEntries.length) {
            project.projectTimeEntries.forEach(timeEntry => {
                let beginDate = new Date(timeEntry.startDate);
                let endDate = new Date(timeEntry.endDate);
                totalHours += CalculateHoursDifference(beginDate, endDate);
            });
        }

        return totalHours;
    };

    return (
        <>
        <TableRow className={classes.root} selected={isSelectedRow}>
            <TableCell width='30px'>
                <IconButton className={classes.expanderColor} aria-label="expand row" size="small" onClick={handleCollapse}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell scope="row" onClick={handleRowClick}>
                {row.projectName}
            </TableCell>
            <TableCell scope="row" onClick={handleRowClick}>
                {row.projectDescription}
            </TableCell>
            <TableCell scope="row" onClick={handleRowClick}>
                {FormatHoursDifference(calculateTotalTime(row))}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={classes.cellWithTable} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="purchases" className={classes.innerTable}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Begin Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Hours</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    anyTimeEntries
                                    ? row.projectTimeEntries.map((timeEntry) => (
                                        <TableRow key={timeEntry.id}>
                                            <TableCell scope="row">
                                                {FormatDateTime(timeEntry.startDate)}
                                            </TableCell>
                                            <TableCell scope="row">
                                                {FormatDateTime(timeEntry.endDate)}
                                            </TableCell>
                                            <TableCell scope="row">
                                                {FormatHoursDifference(CalculateHoursDifference(timeEntry.startDate, timeEntry.endDate))}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <div>No time entries</div>
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
};

export default ProjectTableRow;