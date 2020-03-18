import React, { useState, useEffect } from "react";

import styles from "./Icon.css";

const Icon = ({ name, type }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [text, setText] = useState(name);

  useEffect(() => {}, []);

  const handleChange = e => {
    if (e.target.value.match("\n")) {
      setIsEditingTitle(false);
    } else {
      setText(e.target.value);
    }
  };

  return (
    <figure className={styles.icon}>
      <img
        src={
          type === "folder"
            ? "/windowsIcons/folder.png"
            : "/windowsIcons/file.png"
        }
        alt=""
      />
      <figcaption
        onDoubleClick={e => {
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
  );
};

export default Icon;
