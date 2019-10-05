import React, { Component } from "react";
import "../App.css";

export default class ListItem extends Component {
  onToggleIsChecked = () => {
    this.props.onToggleIsChecked(this.props.name, !this.props.isChecked);
    this.props.sumOfGuest(this.props.isChecked);
  };

  render() {
    const { name, table, isChecked } = this.props;
    return (
      <div>
        <li
          onClick={this.onToggleIsChecked}
          className="hover-on list-group-item text-capitalize d-flex justify-content-between my-2"
        >
          <h6 className={isChecked ? "seated" : ""}>{name}</h6>
          <div className="todo-icon">
            <span className="badge badge-primary badge-pill big-checkbox">
              Table {table}
            </span>
          </div>
        </li>
      </div>
    );
  }
}
