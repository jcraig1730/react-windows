import React from "react";
import { CREATE_WINDOW, REMOVE_WINDOW } from "./index";

export const createWindow = (currentWindows, fileData) => dispatch => {
  const number = currentWindows.length;
  const startX = (number + 1) * 50;
  const startY = (number + 1) * 50;
  const windowId = `window_${number}`;

  const newWindows = [
    ...currentWindows,
    { file: { ...fileData }, startX, startY, windowId }
  ];
  dispatch({ type: CREATE_WINDOW, payload: newWindows });
};

export const removeWindow = (currentWindows, targetId) => async dispatch => {
  const targetIdx = currentWindows.findIndex(
    window => window.windowId === targetId
  );
  const newWindows = currentWindows
    .slice(0, targetIdx)
    .concat(currentWindows.slice(targetIdx + 1));
  dispatch({ type: REMOVE_WINDOW, payload: newWindows });
};
