import React, { useState, useEffect } from "react";
import moment from "moment";

import styles from "./Time.css";

const Time = props => {
  const [time, setTime] = useState(moment().format("LT"));

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format("LT"));
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return <div className={styles.clock}>{time}</div>;
};

export default Time;
