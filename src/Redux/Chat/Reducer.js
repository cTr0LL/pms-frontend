// reducer.js
import * as actionTypes from "./ActionTypes";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  chat: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_REQUEST:
    case actionTypes.SEND_MESSAGE_REQUEST:
    case actionTypes.FETCH_CHAT_MESSAGES_REQUEST:
    case actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_MESSAGES_SUCCESS:
    case actionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.messages,
        error: null,
      };
    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.message],
        error: null,
      };
    case actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: action.chat,
        error: null,
      };
    case actionTypes.FETCH_MESSAGES_FAILURE:
    case actionTypes.SEND_MESSAGE_FAILURE:
    case actionTypes.FETCH_CHAT_MESSAGES_FAILURE:
    case actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default ChatReducer;
