import React from "react";
import { connect } from "react-redux";

import Background from "./Background/Background";
import Startbar from "./Startbar/Startbar";
import Window from "./Window/Window";

const App = ({ windows }) => {
  return (
    <div id="main">
      <Background />
      {windows.map((windowData, idx) => (
        <Window key={`window_${idx}`} {...windowData} />
      ))}
      <Startbar />
      {/* <audio autoPlay loop src="/buzzingComputer.mp3"></audio> */}
    </div>
  );
};

const mapStateToProps = state => ({
  windows: state.windows.windows
});

export default connect(mapStateToProps)(App);
