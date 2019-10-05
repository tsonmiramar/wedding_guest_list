import React, { Component } from "react";
import "../App.css";

export default class ListItem extends Component {
  onToggleIsChecked = () => {
    this.props.onToggleIsChecked(this.props.item.name, !this.props.item.isChecked);
  };

  render() {
    const { name, table, note, isChecked } = this.props.item;
    return (
      <div>
        <li
          onClick={this.onToggleIsChecked}
          className="hover-on list-group-item text-capitalize d-flex justify-content-between my-2"
        >
          <h6 className={isChecked ? "seated" : ""}>{name} {note? `(${note})` : ''}</h6>
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
