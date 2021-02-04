import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';

const useGridStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: '20px',
        padding: '30px'
    }
});

const About: React.FC = () => {
    const classes = useGridStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item>
                        <Paper className={classes.paper}>
                            <Typography align='center'>Test Excercise</Typography>

                            <Typography>User can create projects.</Typography>
                            <Typography>User can register the time that spent on projects.</Typography>
                            <Typography>User can get an overview of time registrations.</Typography>
                            
                            <Divider/>
                            
                            <Typography align='right'>
                                React + Material-UI + .Net Core 3.1
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default About;