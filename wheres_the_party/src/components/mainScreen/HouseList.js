import React, { Component } from 'react';
import HouseCard from './HouseCard';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

import './main.css';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  }
});



class HouseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/house')
        .then(response => response.json())
        .then(data => this.setState({ houses: data.data}));
}

  render() {
    const { classes } = this.props;
    const { houses }= this.state;
    const houseList = houses.map((house) =>(
      <Link key={ house._id} to={`/house/${house._id}`}>
        <HouseCard key={ house._id} eCard name={house.name} description={ house.description } img = { house.imageUrl}> </HouseCard>
      </Link>
    )) 
    
    return (
      <div  className={classes.flexContainer}>
        {houseList}
      </div>
    );
  } 
}

HouseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HouseList);
