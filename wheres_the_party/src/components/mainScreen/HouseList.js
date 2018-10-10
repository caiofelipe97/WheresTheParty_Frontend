import React, { Component } from 'react';
import HouseCard from './HouseCard';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import './main.css';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  }
});

class HouseList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flexContainer}>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
        <HouseCard class="flex-item"></HouseCard>
      </div>
    );
  }
}

HouseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HouseList);
