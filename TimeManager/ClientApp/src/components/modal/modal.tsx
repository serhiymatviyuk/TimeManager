import { Button, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Modal, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, IModalState } from "../../models";
import CloseIcon from '@material-ui/icons/Close';
import { modalActions } from "../../store/reducers";

const useModalStyles = makeStyles({
    modalCloseBtn: {
        float:'right',
        width: '30px',
        height: '30px'
    },
});

const ModalDialog: React.FC = (props) => {
    const modalState = useSelector<IAppState, IModalState>((state) => state.modal);
    const dispatcher = useDispatch();
    const classes = useModalStyles();
    
    const handleCloseDialog = () => {
        dispatcher(modalActions.hideModal());
    };

    return (
        <Dialog open={modalState.visible} maxWidth='lg'>
            <DialogTitle id="dialog-title">
                {modalState.modalContent.title}
                <IconButton className={classes.modalCloseBtn} onClick={handleCloseDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
            {
                modalState.visible && Boolean(modalState.modalContent.component)
                ? <modalState.modalContent.component/>
                : null
            }
            </DialogContent>
        </Dialog>
    )
};

export default ModalDialog;