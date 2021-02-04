import { Divider } from '@material-ui/core';
import * as React from  'react'; 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { projectsActions } from '../../store/reducers';
import ProjectsTable from './projectsTable';
import ProjectToolbox from './projectsToolbox';

const Projects: React.FC = () => {
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(projectsActions.getAllProjectsRequest());
      }, []);

    return (
        <>
        <ProjectToolbox />
        <Divider />
        <ProjectsTable />
        </>
    )
};

export default Projects;