import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./Icon.css";
import { createWindow } from "../../state/actions/";

const Icon = props => {
  const { icon, windows, createWindow, isInWindow } = props;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [text, setText] = useState(icon.name);
  const [startX, setStartX] = useState(icon.startX);
  const [startY, setStartY] = useState(icon.startY);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragStartY, setDragStartY] = useState(null);

  useEffect(() => {
    setText(icon.name);
    setStartX(icon.startX || 0);
    setStartY(icon.startY || 0);
  }, [icon]);

  const handleChange = e => {
    if (e.target.value.match("\n")) {
      setIsEditingTitle(false);
    } else {
      setText(e.target.value);
    }
  };

  const handleDragStart = e => {
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleDragEnd = e => {
    let movementX = Math.abs(e.clientX - dragStartX);
    let movementY = Math.abs(e.clientY - dragStartY);
    if (dragStartY > e.clientY) movementY *= -1;
    if (dragStartX > e.clientX) movementX *= -1;
    const newStartX = startX + movementX;
    const newStartY = startY + movementY;
    setStartX(newStartX);
    setStartY(newStartY);
  };

  return (
    <div
      className={styles.iconWrapper}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      key={icon._id}
      id={icon._id}
      style={{ left: startX, top: startY }}
      onDoubleClick={() => createWindow(windows, icon)}
    >
      <figure className={`${styles.icon} ${isInWindow ? styles.inWindow : ""}`}>
        <img
          src={
            icon.type === "folder"
              ? "https://windows-mock.s3-us-west-1.amazonaws.com/windowsIcons/folder.png"
              : "https://windows-mock.s3-us-west-1.amazonaws.com/windowsIcons/file.png"
          }
          alt=""
        />
        <figcaption
          onDoubleClick={e => {
            e.stopPropagation();
            setIsEditingTitle(!isEditingTitle);
            const listenForEnter = ({ key }) => {
              if (key === "Enter") {
                setIsEditingTitle(false);
                document.body.removeEventListener("keydown", listenForEnter);
              }
            };
            document.body.addEventListener("keydown", listenForEnter);
          }}
        >
          {isEditingTitle ? (
            <input
              autoFocus
              onBlur={() => setIsEditingTitle(false)}
              on
              value={text}
              onChange={handleChange}
              className={styles.editIconTitle}
            />
          ) : (
            `${text}`
          )}
        </figcaption>
      </figure>
    </div>
  );
};

Icon.prototype = {
  createWindow: propTypes.func.isRequired,
  windows: propTypes.array.isRequired
};

const mapDispatchToProps = {
  createWindow
};

const mapStateToProps = state => ({
  windows: state.windows.windows
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
