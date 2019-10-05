import React, { Component } from "react";
import Header from "./Components/Header";
import Search from "./Components/Search";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Search />
      </div>
    );
  }
}
