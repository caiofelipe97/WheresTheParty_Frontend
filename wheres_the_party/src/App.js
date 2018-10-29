import React, { Component } from 'react';
import HouseList from './components/mainScreen/HouseList';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
        <HouseList></HouseList>
      </div>
    );
  }
}

export default App;
