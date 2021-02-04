import * as React from 'react';
import { Button, Container, makeStyles } from '@material-ui/core';

export interface IFormControlProps {
    cancel: Function,
}

const useFooterStyles = makeStyles({
    footerContainer: {
        marginTop: '10px',
        marginBottom: '10px',
        paddingLeft:'10px'
    },
});

const FormFooter: React.FC<IFormControlProps> = (props: IFormControlProps) => {
    const classes = useFooterStyles();
    const { cancel } = props;
    return (
        <Container className={classes.footerContainer}>
            <Button type='submit' variant="contained" color="primary">Save</Button>
            &nbsp;
            <Button onClick={() => cancel()} variant="contained" color="secondary">Cancel</Button>
        </Container>
    )
}

export default FormFooter;

