import React, { Component } from "react";
import ListItem from "./ListItem";

export default class DisplayList extends Component {
  render() {
    const { list, onToggleIsChecked } = this.props;
    return (
      <div>
        <ul className="list-group">
          {list.map((item, index) => {
            return (
              <ListItem
                key={item.index}
                item={item}
                onToggleIsChecked={onToggleIsChecked}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
