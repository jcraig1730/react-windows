import React, { useState } from "react";

import styles from "./Background.css";

// This is the root window on which all other windows live
import Icon from "../Icon/Icon";

const Background = props => {
  const [icons, setIcons] = useState([{ startX: 0, startY: 0, Icon }]);

  const handleDrag = e => {
    setIcons([
      { startX: `${e.clientX - 30}px`, startY: `${e.clientY - 15}px`, Icon }
    ]);
  };

  return (
    <div className={styles.background}>
      {icons.map((icon, idx) => (
        <div
          className={styles.iconWrapper}
          onDragEnd={handleDrag}
          key={idx}
          style={{ left: icon.startX, top: icon.startY }}
        >
          <icon.Icon />
        </div>
      ))}
    </div>
  );
};

export default Background;
