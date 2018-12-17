import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import classNames from 'classnames';


const styles = theme =>  ({
  card: {
    maxWidth: 350,
    marginRight: '10px',
    marginTop: '20px'
  },
  media: {
    height: 250,
    width : 350
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto'
  },
  div:{
    border:'solid',
    width: '40%',
    margin: '0 auto',
    marginTop: '10px'
  }
});

 class PartyForm extends React.Component {
    state = {
      name: '',
      description:'',
      imageUrl:'',
      date: new Date()
    };
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
    handleSubmit = (event) => {
        let token = localStorage.getItem('token');
        let body = {name: this.state.name, description: this.state.description, imageUrl: this.state.imageUrl, date: this.state.date};
        fetch('http://localhost:8080/party', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json; charset=UTF-8",
            'Authorization': token
          },
          body: JSON.stringify(body)
         }).then(response => response.json())
         .then(data =>{
           console.log(data);
         });
       };
  render() {
    const { classes } = this.props;
      return (
    <div className={classes.div}>
      <h1>Add new Party</h1>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            />
            <TextField
            id="standard-description"
            label="Description"
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange('description')}
            margin="normal"
            />
            <TextField
            id="standard-imageUrl"
            label="Image URL"
            className={classes.textField}
            value={this.state.imageUrl}
            onChange={this.handleChange('imageUrl')}
            margin="normal"
            />
            <TextField
            id="date"
            label="Party Date"
            type="date"
            className={classes.textField}
            onChange={this.handleChange('date')}
            InputLabelProps={{ shrink: true }}
            />
            <Button  variant="contained" color="primary" label="Submit" type="submit" style={{ marginRight: 8, marginBottom:10 }}>
                Add new Party
            </Button> 
        </form>
      </div>
      )
  };
}

PartyForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartyForm);