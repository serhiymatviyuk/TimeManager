import { Paper, Typography } from '@material-ui/core';
import * as React from 'react';

const NotFound: React.FC = () => {
    return (
    <Paper style={{marginTop: '20px', padding: '30px'}}>
        <Typography align='center' style={{fontSize: 24}}>
            Nothing here
        </Typography>
    </Paper>
    )
};

export default NotFound;