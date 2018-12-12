import React, { Component } from 'react';
import HouseList from './components/mainScreen/HouseList';
import House from './components/houseScreen/House';
import Header from './components/Header';
import Login from './components/loginScreen/Login';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { search: ""};
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(search){
    this.setState({search});
  }

  render() {
    const {search} = this.state;
    return (
      <div className="App">
      <Router>
        <div className="App">
          <Header onSearchChange = {this.handleSearchChange}/>
          <Route exact={true} path="/"  render={(props) => (<HouseList {...props} search={search} />)}/>
          <Route path="/house/:houseId" component={House}/>
          <Route path="/login" component={Login} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
