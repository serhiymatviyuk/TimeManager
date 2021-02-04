import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import projectsReducer from "./projectsReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    modal: modalReducer,
    projects: projectsReducer,
}); 

export default rootReducer;