import axios from "axios";
import { GET_DESKTOP } from "./";

const apiUrl = `http://localhost:8000`;

export const getDesktop = () => async dispatch => {
  try {
    const rootFolder = await axios.get(`${apiUrl}/folder`);
    dispatch({ type: GET_DESKTOP, payload: rootFolder.data });
    return;
  } catch (err) {
    console.log(err);
  }
};
