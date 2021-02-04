import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles({
    cell: {
        textAlign: 'center'
    },
    text: {
        color: '#808080'
    }
});

const EmptyProjectsTableRow = () => {
    const classes = useStyles();
    return (
        <TableRow>
            <TableCell colSpan={4} className={classes.cell}>
                <Typography className={classes.text}>
                    No projects to display
                </Typography>
            </TableCell>
        </TableRow>
    )
}

export default EmptyProjectsTableRow;