import { FormControl, Paper, TextField } from '@material-ui/core';
import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions, projectsActions } from "../../../store/reducers";
import { IAppState, Project } from '../../../models';
import FormFooter from './formFooter';
import TimeEntriesControl from './timeEntriesControl';
import './formStyles.scss';
import { useEffect } from 'react';

const CreateProject: React.FC = () => {
    const dispatcher = useDispatch();
    const editedProject = useSelector<IAppState, Project>(state => state.projects.selectedProject);

    useEffect(() => {
        formData.setFieldValue('projectTimeEntries', editedProject?.projectTimeEntries ?? []);
        formData.setFieldTouched('projectTimeEntries');
    }, [editedProject]);

    const validationSchema = Yup.object().shape({
        projectName: Yup.string()
            .required(() => 'Name is required')
            .min(3)
            .max(50),
        projectDescription: Yup.string()
            .min(3)
            .max(50),
        projectTimeEntries: Yup.array(),
    });

    const formData = useFormik({
        initialValues: editedProject ?? new Project(),
        validationSchema: validationSchema,
        onSubmit: (project) => {
            dispatcher(modalActions.hideModal());
            if(Boolean(editedProject)) {
                dispatcher(projectsActions.updateProjectRequest(project));
            } else {
                dispatcher(projectsActions.addNewProjectRequest(project));
            }
        },
    });

    const handleCancel = () => {
        dispatcher(modalActions.hideModal());
    };

    return (
        <>
        <form onSubmit={formData.handleSubmit}>
            <Paper elevation={3} className='FormGroupContainer'>
                <FormControl>
                    <TextField
                        fullWidth
                        id="projectName"
                        name="projectName"
                        label="Project Name"
                        variant="outlined"
                        value={`${formData.values.projectName ?? ''}`}
                        onChange={formData.handleChange}
                        error={formData.touched.projectName && Boolean(formData.errors.projectName)}
                        helperText={formData.touched.projectName && formData.errors.projectName}/>
                </FormControl>
                &nbsp;
                <FormControl>
                    <TextField
                        fullWidth
                        id="projectDescription"
                        name="projectDescription"
                        label="Project Description"
                        variant="outlined"
                        value={`${formData.values.projectDescription ?? ''}`}
                        onChange={formData.handleChange}
                        error={formData.touched.projectDescription && Boolean(formData.errors.projectDescription)}
                        helperText={formData.touched.projectDescription && formData.errors.projectDescription}/>
                </FormControl>
            </Paper>

            <Paper elevation={3} className='FormGroupContainer'>
                <TimeEntriesControl formData={formData} />
            </Paper>

            <FormFooter cancel={handleCancel}/>

        </form>
        </>
    )
}

export default CreateProject;