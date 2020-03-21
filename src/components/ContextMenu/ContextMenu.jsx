import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";

import styles from "./ContextMenu.css";

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement("div");
    this.element.id = "context";
    this.state = {
      isReady: this.props.isReady,
      isOpen: false,
      x: null,
      y: null
    };
    this.handleSetup = this.handleSetup.bind(this);
  }

  handleSetup() {
    this.target = document.querySelector(this.props.target);

    if (!this.target) return;
    const closeMenu = e => {
      this.target.removeChild(this.element);
      this.setState({ isOpen: false, x: null, y: null });
      document.body.removeEventListener("click", closeMenu);
    };

    const handleClick = e => {
      e.preventDefault();
      if (!this.state.isOpen) {
        document.body.addEventListener("click", closeMenu);
      }
      this.setState({ isOpen: true, x: e.clientX, y: e.clientY - 15 });
      this.target.appendChild(this.element);
    };

    this.target.oncontextmenu = handleClick;
  }

  componentDidMount() {
    if (this.state.isReady) {
      this.handleSetup();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isReady === false && this.props.isReady === true) {
      this.handleSetup();
    }
  }

  render() {
    return ReactDOM.createPortal(
      <ul
        className={styles.contextMenu}
        style={{
          top: this.state.y,
          left: this.state.x,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        {this.props.children}
      </ul>,
      this.element
    );
  }
}

ContextMenu.propTypes = {
  isReady: propTypes.bool.isRequired,
  target: propTypes.string.isRequired,
  children: propTypes.array
};

export default ContextMenu;
