import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import MoveableComponent from "../MoveableComponent/MoveableComponent";
import styles from "./Icon.css";
import { createWindow } from "../../state/actions/";

const Icon = props => {
  const { icon, windows, createWindow, isInWindow } = props;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [text, setText] = useState(icon.name);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setText(icon.name);
  }, [icon]);

  const handleChange = e => {
    if (e.target.value.match("\n")) {
      setIsEditingTitle(false);
    } else {
      setText(e.target.value);
    }
  };

  return (
    <MoveableComponent
      target={"#i" + icon._id}
      initialX={icon.startX || 0}
      initialY={icon.startY || 0}
      position="relative"
      isReady={isReady}
    >
      <div
        className={styles.iconWrapper}
        key={icon._id}
        id={"i" + icon._id}
        onDoubleClick={() => createWindow(windows, icon)}
        onMouseOver={() => setIsReady(true)}
      >
        <figure
          className={`${styles.icon} ${isInWindow ? styles.inWindow : ""}`}
        >
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
    </MoveableComponent>
  );
};

Icon.prototype = {
  createWindow: propTypes.func.isRequired,
  windows: propTypes.array.isRequired,
  icon: propTypes.object.isRequired
};

const mapDispatchToProps = {
  createWindow
};

const mapStateToProps = state => ({
  windows: state.windows.windows
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
