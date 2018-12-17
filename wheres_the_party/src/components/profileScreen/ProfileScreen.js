import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProfileForm from './ProfileForm';
import PartyForm from './PartyForm';

 class ProfileScreen extends React.Component {
  render() {
      return (
        <div>
          <ProfileForm/>
          <PartyForm/>
        </div>
      )
  };
}

ProfileScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (ProfileScreen);