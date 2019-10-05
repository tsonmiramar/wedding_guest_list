import React, { Component } from "react";
import ListItem from "./ListItem";

export default class DisplayList extends Component {
  render() {
    const { list, onToggleIsChecked, sumOfGuest } = this.props;
    return (
      <div>
        <ul className="list-group">
          {list.map((item, index) => {
            return (
              <ListItem
                key={item.index}
                name={item.name}
                table={item.table}
                isChecked={item.isChecked}
                onToggleIsChecked={onToggleIsChecked}
                sumOfGuest={sumOfGuest}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
