import React, { useState, useEffect } from "react";
import { getDesktop } from "../../state/actions";
import { connect } from "react-redux";
import propTypes from "prop-types";

import styles from "./Background.css";

// This is the root window on which all other windows live
import Icon from "../Icon/Icon";

const Background = ({ getDesktop, iconList }) => {
  // const [icons, setIcons] = useState([{ startX: 0, startY: 0, Icon }]);
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    (async () => {
      await getDesktop();
    })();
  }, []);

  useEffect(() => {
    setIcons(iconList);
  }, [iconList]);

  const handleDrag = e => {
    e.persist();
    const newIcons = icons.map(icon => {
      console.log("in handle drag");
      console.log(e);
      console.log({ icon: icon._id, target: e.target.offsetParent.id });
      if (icon._id !== e.target.offsetParent.id) return icon;
      return {
        ...icon,
        startX: `${e.clientX - 30}px`,
        startY: `${e.clientY - 15}px`
      };
    });
    setIcons(newIcons);
    console.log(newIcons);

    // setIcons([
    //
    // ]);
  };
  // const launchWindow = e => {
  //   const windowTarget = document.createElement('div');

  // }

  return (
    <div className={styles.background}>
      {icons.map(icon => (
        <div
          className={styles.iconWrapper}
          onDragEnd={handleDrag}
          key={icon._id}
          id={icon._id}
          style={{ left: icon.startX, top: icon.startY }}
          // onDoubleClick={launchWindow}
        >
          <Icon name={icon.name} type={icon.type} />
        </div>
      ))}
    </div>
  );
};

Background.propTypes = {
  getDesktop: propTypes.func.isRequired,
  iconList: propTypes.array.isRequired
};

const mapDispatchToProps = {
  getDesktop
};

const mapStateToProps = state => ({
  iconList: state.desktop.iconList
});

export default connect(mapStateToProps, mapDispatchToProps)(Background);
