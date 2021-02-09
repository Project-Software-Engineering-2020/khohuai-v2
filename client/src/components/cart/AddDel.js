import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";

class AddDel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      show: true,
    };
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };

  render() {
    return (
      <div className="AddDel">
        <button type="button" className="btnDel" onClick={this.DecreaseItem}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        {this.state.show ? <span>{this.state.clicks}</span> : ""}
        <button type="button" className="btnAdd" onClick={this.IncrementItem}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {/* &nbsp;&nbsp;&nbsp;คงเหลือจำนวน 2 ใบ */}
      </div>
    );
  }
}

export default AddDel;
