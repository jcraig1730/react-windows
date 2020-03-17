import React from "react";

import styles from "./Startbar.css";
import StartButton from "./StartButton/StartButton";
import Time from "./Time/Time";

const Startbar = props => {
  return (
    <div className={styles.startbar}>
      <StartButton />
      <Time />
    </div>
  );
};

export default Startbar;
