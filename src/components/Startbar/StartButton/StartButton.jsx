import React from "react";

import styles from "./StartButton.css";

const StartButton = props => {
  return (
    <div className={styles.button}>
      <img
        src="https://windows-mock.s3-us-west-1.amazonaws.com/windowsIcons/windowsLogo.png"
        alt=""
      />
      <span>Start</span>
    </div>
  );
};

export default StartButton;
