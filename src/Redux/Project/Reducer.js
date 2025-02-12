// reducer.js
import * as actionTypes from "./ActionTypes";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchProjects: [],
};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_REQUEST:
    case actionTypes.CREATE_PROJECT_REQUEST:
    case actionTypes.UPDATE_PROJECT_REQUEST:
    case actionTypes.DELETE_PROJECT_REQUEST:
    case actionTypes.FETCH_PROJECT_BY_Id_REQUEST:
    case actionTypes.ACCEPT_INVITATION_REQUEST:
    case actionTypes.INVITE_TO_PROJECT_REQUEST:
    case actionTypes.SEARCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
        error: null,
      };
    case actionTypes.SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProjects: action.projects,
        error: null,
      };
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.project],
        error: null,
      };
    case actionTypes.FETCH_PROJECT_BY_Id_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.projectDetails,
        error: null,
      };
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: state.projects.map((project) =>
          project.id === action.project.id ? action.project : project
        ),
      };
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
      };
    case actionTypes.FETCH_PROJECTS_FAILURE:
    case actionTypes.FETCH_PROJECT_BY_Id_FAILURE:
    case actionTypes.SEARCH_PROJECT_FAILURE:
    case actionTypes.CREATE_PROJECT_FAILURE:
    case actionTypes.UPDATE_PROJECT_FAILURE:
    case actionTypes.DELETE_PROJECT_FAILURE:
    case actionTypes.INVITE_TO_PROJECT_FAILURE:
    case actionTypes.ACCEPT_INVITATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
