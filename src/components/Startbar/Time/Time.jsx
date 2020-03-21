import React, { useState, useEffect } from "react";

import styles from "./Time.css";

const Time = props => {
  const formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours > 12 ? `${hours - 12}:${minutes}PM` : `${hours}:${minutes}AM`;
  };
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return <div className={styles.clock}>{time}</div>;
};

export default Time;
