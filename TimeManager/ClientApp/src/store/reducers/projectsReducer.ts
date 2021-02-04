import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProjectsState, Project } from "../../models";

const initProjectsState = () => {
    return {
        projects: [],
        selectedProject: null
    } as IProjectsState;
}

const projectsSlice = createSlice({
    name: "projects",
    initialState: initProjectsState(),
    reducers: {
        //endpoint to bind epics
        getAllProjectsRequest(state) {},
        addNewProjectRequest(state, action: { type: string; payload: Project }) {},
        updateProjectRequest(state, action: { type: string; payload: Project }) {},
        deleteProjectByIdRequest(state, action: { type: string; payload: number }) {},
        //state changings
        setProjects(state, action: PayloadAction<Project[]>) {
            state.selectedProject = null;
            state.projects = action.payload;
            return state;
        },
        selectProject(state, action: PayloadAction<Project>) {
            state.selectedProject = action.payload;
            return state;
        },
    }
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;