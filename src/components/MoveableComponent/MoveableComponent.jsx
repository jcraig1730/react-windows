import React from "react";
import propTypes from "prop-types";

import styles from "./MoveableComponent.css";

class MoveableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xStart: this.props.initialX,
      yStart: this.props.initialY,
      isReady: this.props.isReady,
      setupComplete: false
    };
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleSetup = this.handleSetup.bind(this);
  }

  handleSetup() {
    this.target = document.querySelector(this.props.target);
    if (!this.target) return;
    this.target.ondragstart = e => this.handleDragStart(e);
    this.target.ondragend = e => this.handleDragEnd(e);
    if (!this.state.setupComplete) this.setState({ setupComplete: true });
  }

  componentDidMount() {
    if (this.state.isReady && !this.state.setupComplete) {
      this.handleSetup();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.isReady && nextProps.isReady === true) return true;
    if (this.state.setupComplete === false && nextState.setupComplete === true)
      return true;
    if (
      this.state.xStart != nextState.xStart ||
      this.state.yStart != nextState.yStart
    )
      return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isReady === false && this.props.isReady === true) {
      this.handleSetup();
    }
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
      xStart: Number(this.state.xStart) + movementX,
      yStart: Number(this.state.yStart) + movementY
    });
  }

  render() {
    return (
      <div
        className={styles.wrapper}
        style={{
          top: `${this.state.yStart}px`,
          left: `${this.state.xStart}px`,
          position: this.props.position,
          width: "fit-content",
          height: "fit-contet",
          margin: 0,
          padding: 0
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

MoveableComponent.propTypes = {
  target: propTypes.string.isRequired,
  initialX: propTypes.number.isRequired,
  initialY: propTypes.number.isRequired,
  isReady: propTypes.bool.isRequired,
  position: propTypes.string.isRequired
};

export default MoveableComponent;
