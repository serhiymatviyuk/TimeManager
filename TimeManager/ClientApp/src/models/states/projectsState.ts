import { Project } from "../entities/project";

export interface IProjectsState{
    projects: Project[],
    selectedProject: Project;
}