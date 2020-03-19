import { CREATE_WINDOW, REMOVE_WINDOW } from "../actions";

const initialState = {
  windows: []
};

const windowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WINDOW:
      return {
        ...state,
        windows: action.payload
      };

    case REMOVE_WINDOW:
      return {
        ...state,
        windows: action.payload
      };
    default:
      return { ...state };
  }
};

export default windowsReducer;
