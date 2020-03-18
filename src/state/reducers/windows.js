import { GET_WINDOWS } from "../actions";
import { CREATE_WINDOW } from "../actions";

const initialState = {
  iconList: []
};

const desktopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DESKTOP:
      return (state = {
        ...state,
        iconList: action.payload
      });
    default:
      return { ...state };
  }
};

export default desktopReducer;
