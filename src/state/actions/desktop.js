import axios from "axios";
import { GET_DESKTOP } from "./";

const apiUrl = `https://react-windows.herokuapp.com/api`;

export const getDesktop = () => async dispatch => {
  try {
    const rootFolder = await axios.get(`${apiUrl}/file`);
    dispatch({ type: GET_DESKTOP, payload: [rootFolder.data] });
    return;
  } catch (err) {
    console.log(err);
  }
};
export const updateDesktop = (id, updatedInfo) => async dispatch => {
  try {
    await axios.put(`${apiUrl}/desktop/${id}`, updatedInfo);
    const rootFolder = await axios.get(`${apiUrl}/folder`);
    dispatch({ type: GET_DESKTOP, payload: rootFolder.data });
  } catch (err) {
    console.log(err);
  }
};
