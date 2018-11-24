import React, { Component } from "react";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner" style={{ borderRadius: 25 }}>
          <h1 className="text-center">{`Profile`}</h1>

          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default Popup;
