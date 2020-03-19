import React from "react";

import styles from "./Startbar.css";
import StartButton from "./StartButton/StartButton";
import Time from "./Time/Time";

const Startbar = () => {
  return (
    <div className={styles.startbar}>
      <StartButton />
      <div id="windowTarget" className={styles.windowTarget}></div>
      <Time />
    </div>
  );
};

export default Startbar;
