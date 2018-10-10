import React, { Component } from 'react';
import HouseList from './components/mainScreen/HouseList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HouseList></HouseList>
      </div>
    );
  }
}

export default App;
