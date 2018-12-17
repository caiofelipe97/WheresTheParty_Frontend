import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  },
  form:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: 275,
    height: ''
  },
  title:{
    paddingTop:10
  },
  error:{
    color: 'red',
    fontWeight: 'bold'
  }
});

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
    email:'',
    password:''
    }
  }

  login() {
    console.log(this.state);
    let body = {email: this.state.email, password: this.state.password};
    fetch('http://localhost:8080/user/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(body)
     }).then(response => response.json())
     .then(data =>{
       console.log(data);
       if(data.error){
        this.setState({error:data.error});
       } else {
        localStorage.setItem('token', data.token);
        this.props.history.push('/');
       }
     });
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <div className={classes.container}  >
        <Card className={classes.card}>
          <Typography className={classes.title} variant="title" gutterBottom>
            Login
          </Typography>
          <form className={classes.form}   noValidate autoComplete="off">
            <TextField
              id="standard-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              value = { this.state.email}
              onChange = {(e)=>{this.setState({email:e.target.value})}}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange = {(e)=>{this.setState({password:e.target.value})}}
            />
            {error && (<Typography className={classes.error} variant="h6" gutterBottom>
            {error}
            <br/>
          </Typography>)}
            <Button variant="contained" color="primary" className={classes.button} onClick={ () => this.login() }>
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Login));
