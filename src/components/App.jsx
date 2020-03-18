import React from "react";

import Background from "./Background/Background";
import Startbar from "./Startbar/Startbar";

import Window from "./Window/Window";

const App = props => {
  return (
    <div>
      <Background />
      <Window />
      <Startbar />
      {/* <audio autoPlay src="/buzzingComputer.mp3"></audio> */}
    </div>
  );
};

export default App;
