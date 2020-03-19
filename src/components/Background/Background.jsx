import React, { useState, useEffect } from "react";
import { getDesktop, createWindow } from "../../state/actions";
import { connect } from "react-redux";
import propTypes from "prop-types";

import styles from "./Background.css";

import Icon from "../Icon/Icon";

const Background = ({ getDesktop, iconList }) => {
  const [icons, setIcons] = useState([]);
  useEffect(() => {
    getDesktop();
  }, []);

  useEffect(() => {
    setIcons(iconList);
  }, [iconList]);

  return (
    <div className={styles.background}>
      {icons.map((icon, idx) => (
        <Icon icon={icon} key={idx} />
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
  iconList: state.desktop.iconList,
  windows: state.windows.windows
});

export default connect(mapStateToProps, mapDispatchToProps)(Background);
