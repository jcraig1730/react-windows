import React, { Component } from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { removeWindow } from "../../state/actions";

import Icon from "../Icon/Icon";
import styles from "./Window.css";

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: false,
      isMaximized: false,
      startX: this.props.startX,
      startY: this.props.startY
    };
    this.window = document.createElement("div");
    this.window.id = `window_${this.props.id}`;
    this.window.className = styles.startbar;

    this.maximizeWindow = this.maximizeWindow.bind(this);
    this.minimizeWindow = this.minimizeWindow.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    document.querySelector("#windowTarget").appendChild(this.window);
  }

  componentWillUnmount() {
    document.querySelector("#windowTarget").removeChild(this.window);
  }

  minimizeWindow() {
    this.setState({ isMinimized: !this.state.isMinimized });
  }

  maximizeWindow() {
    this.setState({ isMaximized: !this.state.isMaximized });
  }

  close() {
    this.props.removeWindow(this.props.windows, this.props.windowId);
  }

  handleDragStart(e) {
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
  }

  handleDragEnd(e) {
    let movementX = Math.abs(this.dragStartX - e.clientX);
    let movementY = Math.abs(this.dragStartY - e.clientY);
    if (this.dragStartX > e.clientX) {
      movementX *= -1;
    }
    if (this.dragStartY > e.clientY) {
      movementY *= -1;
    }
    this.setState({
      startX: this.state.startX + movementX,
      startY: this.state.startY + movementY
    });
  }

  render() {
    const { isMinimized, isMaximized, startX, startY } = this.state;
    return ReactDOM.createPortal(
      <div className={styles.container}>
        <div
          style={{
            left: startX,
            top: startY
          }}
          className={`${styles.wrapper}
          ${isMinimized ? styles.minimized : ""} ${
            isMaximized ? styles.maximized : ""
          }`}
        >
          <div className={styles.window}>
            <div
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
              className={styles.topbar}
            >
              <div className={styles.windowLabel}>{this.props.file.name}</div>
              <div className={styles.windowButtons}>
                <div
                  className={`${styles.button}`}
                  onClick={this.minimizeWindow}
                >
                  <i className="far fa-window-minimize"></i>
                </div>
                <div
                  className={`${styles.button}`}
                  onClick={this.maximizeWindow}
                >
                  <i className="far fa-window-maximize"></i>
                </div>
                <div onClick={this.close} className={`${styles.button}`}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
            </div>
            <div className={styles.menubar}>File Edit View Help</div>
            <div className={styles.content}>
              {this.props.file.children.map(child => {
                return <Icon icon={child} isInWindow={true} />;
              })}
            </div>
            <div className={styles.bottombar}>
              <div className={styles.section1}>
                {this.props.file.children.length} Object(s)
              </div>
              <div className={styles.section2}></div>
            </div>
          </div>
        </div>
        <div onClick={this.minimizeWindow}>{this.props.file.name}</div>
      </div>,
      this.window
    );
  }
}

Window.propTypes = {
  removeWindow: propTypes.func.isRequired,
  windows: propTypes.array.isRequired
};

const mapStateToProps = state => ({
  windows: state.windows.windows
});

const mapDispatchToProps = {
  removeWindow
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);
