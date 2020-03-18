import { GET_DESKTOP } from "../actions";

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
