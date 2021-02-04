import { ProjectTimeEntry } from "./projectTimeEntry";

export class Project {
    id: number = 0;
    projectName:string = '';
    projectDescription:string = '';
    projectTimeEntries: ProjectTimeEntry[] = [];
}