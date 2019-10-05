import React, { Component } from "react";
import GuestList from "./GuestList";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      initialList: [],
      numGuestChecked: 0
    };
  }

  getItems = async () => {
    let response = await fetch(`https://wedding-guestlist-e02f2.firebaseio.com/masterSheet.json?auth=yTde7tOrhsHrpg600pwqyESn7quBtQicJtpDnffa`)
    if (response.ok){
      let result = await response.json();
      let fetchedList = result.map(guest => ({ ...guest, isChecked: false }));
      this.setState({
        initialList: fetchedList,
        list: fetchedList
      });
    }    
  };

  filteredList = event => {
    var charInput = event.target.value.toLowerCase();
    var updatedList = this.state.initialList;
    updatedList = updatedList.filter(item => {
      return item.name.toLowerCase().search(charInput) !== -1;
    });
    this.setState({
      list: [...updatedList]
    });
  };

  componentDidMount() {
    this.getItems();
  }

  onToggleIsChecked = (guestName, isSeated) => {
    this.setState(prevState => {
      let updatedList = [...prevState.initialList];
      let selectedGuest = updatedList.find(guest => guest.name === guestName);
      let idx = updatedList.indexOf(selectedGuest);
      updatedList[idx].isChecked = isSeated;
      return {
        initialList: updatedList
      };
    });
  };

  sumOfGuest = isChecked => {
    if (isChecked) {
      this.setState({
        numGuestChecked: this.state.numGuestChecked - 1
      });
    } else {
      this.setState({
        numGuestChecked: this.state.numGuestChecked + 1
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <section className="search">
          <form className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search name here"
              onChange={this.filteredList}
            />
          </form>
          <h2 className="numGuest">
            Number of Guest Checked: {this.state.numGuestChecked}
          </h2>
          <GuestList
            list={this.state.list}
            handleClick={this.handleClick}
            onToggleIsChecked={this.onToggleIsChecked}
            sumOfGuest={this.sumOfGuest}
          />
        </section>
      </React.Fragment>
    );
  }
}
