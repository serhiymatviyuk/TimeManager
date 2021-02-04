import { AnyAction } from "redux";
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { projectsActions } from "../reducers";
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import {SERVER_URL} from '../../constants'; 
import { Project } from "../../models";

const queryString = `${SERVER_URL}/projects`;

export const getAllProjectsRequestEpic = (action$: AnyAction, state$: any) => {
    return action$.pipe(
        ofType(projectsActions.getAllProjectsRequest.type),
        switchMap((action: AnyAction) => {
            return ajax.getJSON<Project[]>(queryString, {'Content-Type': 'application/json'})
                .pipe(map(payload => ({ type: projectsActions.setProjects.type, payload })));
        })
    );
};

export const addNewProjectRequestEpic = (action$: AnyAction, state$: any) => {
    return action$.pipe(
        ofType(projectsActions.addNewProjectRequest.type),
        switchMap((action: AnyAction) => {
            return ajax.post(queryString, action.payload, {'Content-Type': 'application/json'})
                .pipe(map(
                    payload => ({ type: projectsActions.getAllProjectsRequest.type, payload }),
                    error => {
                        console.log(error);
                        return { type: projectsActions.getAllProjectsRequest.type };
                    }));
        })
    );
};

export const updateProjectRequestEpic = (action$: AnyAction, state$: Project) => {
    return action$.pipe(
        ofType(projectsActions.updateProjectRequest.type),
        switchMap((action: AnyAction) => {
            return ajax.put(queryString, action.payload, {'Content-Type': 'application/json'})
                .pipe(map(
                    payload => ({ type: projectsActions.getAllProjectsRequest.type }),
                    error => {
                        console.log(error);
                        return { type: projectsActions.getAllProjectsRequest.type };
                    }));
        })
    );
};

export const deleteProjectByIdRequestEpic = (action$: AnyAction, state$: number) => {
    return action$.pipe(
        ofType(projectsActions.deleteProjectByIdRequest.type),
        switchMap((action: AnyAction) => {
            return ajax.delete(`${queryString}?id=${action.payload}`, {'Content-Type': 'application/json'})
                .pipe(map(
                    payload => ({ type: projectsActions.getAllProjectsRequest.type, payload }),
                    error => {
                        console.log(error);
                        return { type: projectsActions.getAllProjectsRequest.type }
                    }));
        })
    );
};