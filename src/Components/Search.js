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
    var charInput = event.target.value;
    this.setState((prevState) => {
      let numberInput = parseInt(charInput, 10);
      var updatedList = prevState.initialList;
      if (isNaN(numberInput)) {
        charInput = charInput.toLowerCase();
        updatedList = updatedList.filter(item => item.name.toLowerCase().search(charInput) !== -1 || item.note.toLowerCase().search(charInput) !== -1);
      } else {
        updatedList = updatedList.filter(item => item.table === numberInput);
      }
      return {
        list: [...updatedList]
      }
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
        initialList: updatedList,
        numGuestChecked: isSeated ? prevState.numGuestChecked + 1 : prevState.numGuestChecked - 1
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="search">
          <form className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={this.filteredList}
            />
          </form>
          <h2 className="numGuest">
            Total Number of Guests: {this.state.initialList.length}
            <br/>
            Number of Guest Checked: {this.state.numGuestChecked}
          </h2>
          {
            this.state.initialList.length > 0 && 
            this.state.numGuestChecked === this.state.initialList.length &&
            <h2>All Guest Are Seated</h2>
          }
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
