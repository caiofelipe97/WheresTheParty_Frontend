import React, { Component } from 'react';
import HouseList from './components/mainScreen/HouseList';
import House from './components/houseScreen/House';
import Header from './components/Header';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Header/>
          <Route exact={true} path="/" component={HouseList}/>
          <Route path="/house/:houseId" component={House}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
