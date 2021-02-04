import { AppBar, Button, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState, Project } from '../../models';
import { modalActions, projectsActions } from '../../store/reducers';
import CreateProject from './forms/createUpdateProject';
import RefreshIcon from '@material-ui/icons/Refresh';

const useToolboxStyles = makeStyles({
    toolBar: {
        background: 'transparent',
        boxShadow: 'none',
        color:'inherit'
    },
    iconMargin: {
        marginRight: '5px'
    }
});

const ProjectToolbox: React.FC = () => {
    const dispatcher = useDispatch();
    const selectedProject = useSelector<IAppState, Project>(state => state.projects.selectedProject);
    const isChangingDisabled = !Boolean(selectedProject);

    const classes = useToolboxStyles();

    const handleCreate = () => {
        dispatcher(projectsActions.selectProject(null));
        dispatcher(modalActions.showModal({
            title: 'New project',
            component: CreateProject,
        }));
    };
    
    const handleEdit = () => {
        dispatcher(modalActions.showModal({
            title: `Edit ${selectedProject.projectName}`,
            component: CreateProject,
        }));
    };
    
    const handleRefresh = () => {
        dispatcher(projectsActions.getAllProjectsRequest());
     };

    const handleDelete = () => {
        dispatcher(modalActions.hideModal());
        dispatcher(projectsActions.deleteProjectByIdRequest(selectedProject.id));
    };

    return (
        <AppBar position="static" className={classes.toolBar}>
            <Toolbar>
                <IconButton className={classes.iconMargin} edge="end" aria-label="refresh" onClick={handleRefresh}>
                    <RefreshIcon />
                </IconButton>
                <Button color="inherit" onClick={handleCreate}><AddIcon/> New Project</Button>
                <Button color="inherit" disabled={isChangingDisabled} onClick={handleEdit}><EditIcon/> Edit Project</Button>
                <Button color="inherit" disabled={isChangingDisabled} onClick={handleDelete}><DeleteIcon/> Delete Project</Button>
            </Toolbar>
        </AppBar>
    )
}

export default ProjectToolbox;