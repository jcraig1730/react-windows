import React, { Component } from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { removeWindow } from "../../state/actions";
import { v1 as uuid } from "uuid";

import Icon from "../Icon/Icon";
import ContextMenu from "../ContextMenu/ContextMenu";
import MoveableComponent from "../MoveableComponent/MoveableComponent";
import styles from "./Window.css";

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: false,
      isMaximized: false,
      isMountedToDOM: false
    };
    this.window = document.createElement("div");
    this.window.id = `window_${this.props.id}`;
    this.window.className = styles.startbar;
    this.moveableTarget = "window_grab_" + uuid();
    this.contextTarget = "context_" + uuid();
  }

  componentDidMount() {
    document.querySelector("#windowTarget").appendChild(this.window);
    const initialListener = e => {
      this.setState({ isMountedToDOM: true });
    };
    this.window.addEventListener("mouseover", initialListener, { once: true });
  }

  componentWillUnmount() {
    document.querySelector("#windowTarget").removeChild(this.window);
  }

  render() {
    const { isMinimized, isMaximized } = this.state;
    return ReactDOM.createPortal(
      <div style={{ height: "100%" }}>
        <div
          onClick={() =>
            this.setState({ isMinimized: !this.state.isMinimized })
          }
          style={{ height: "100%" }}
          className={styles.startAnchor}
        >
          {this.props.file.name}
        </div>
        <MoveableComponent
          target={"#" + this.moveableTarget}
          isReady={this.state.isMountedToDOM}
          initialX={this.props.startX}
          initialY={this.props.startY}
          position="fixed"
        >
          <div className={styles.container}>
            <div
              className={`${styles.wrapper}
          ${isMinimized ? styles.minimized : ""} ${
                isMaximized ? styles.maximized : ""
              }`}
            >
              <div className={styles.window}>
                <div className={styles.topbar} id={this.moveableTarget}>
                  <div className={styles.windowLabel}>
                    {this.props.file.name}
                  </div>
                  <div className={styles.windowButtons}>
                    <div
                      className={`${styles.button}`}
                      onClick={() =>
                        this.setState({ isMinimized: !this.state.isMinimized })
                      }
                    >
                      <i className="far fa-window-minimize"></i>
                    </div>
                    <div
                      className={`${styles.button}`}
                      onClick={() =>
                        this.setState({ isMaximized: !this.state.isMaximized })
                      }
                    >
                      <i className="far fa-window-maximize"></i>
                    </div>
                    <div
                      onClick={() =>
                        this.props.removeWindow(
                          this.props.windows,
                          this.props.windowId
                        )
                      }
                      className={`${styles.button}`}
                    >
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.menubar}>File Edit View Help</div>
                <div className={styles.content} id={this.contextTarget}>
                  <ContextMenu
                    isReady={this.state.isMountedToDOM}
                    target={"#" + this.contextTarget}
                  >
                    <li className={styles.contextMenuItem} id="new">
                      New =>
                    </li>
                    <li className={styles.contextMenuItem} id="option2">
                      Option2 =>
                    </li>
                  </ContextMenu>

                  {this.props.file.children.map(child => (
                    <Icon icon={child} isInWindow={true} />
                  ))}
                </div>
                <div className={styles.bottombar}>
                  <div className={styles.section1}>
                    {this.props.file.children.length} Object(s)
                  </div>
                  <div className={styles.section2}></div>
                </div>
              </div>
            </div>
          </div>
        </MoveableComponent>
      </div>,
      this.window
    );
  }
}

Window.propTypes = {
  removeWindow: propTypes.func.isRequired,
  windows: propTypes.array.isRequired,
  file: propTypes.object.isRequired,
  startX: propTypes.number.isRequired,
  startY: propTypes.number.isRequired,
  windowId: propTypes.string.isRequired
};

const mapStateToProps = state => ({
  windows: state.windows.windows
});

const mapDispatchToProps = {
  removeWindow
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);
