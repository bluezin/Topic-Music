import React from "react";
import "./style.scss";

const Loading = () => {
  return (
    <div className="App__loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
