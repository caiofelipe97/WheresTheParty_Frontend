import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


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
  }
});

class Login extends Component {
  constructor(props){
    super(props);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}  >
        <Card className={classes.card}>
          <Typography className={classes.title} variant="title" gutterBottom>
            Login
          </Typography>
          <form className={classes.form}   noValidate autoComplete="off">

            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              onChange={this.handleChange('name')}
              margin="normal"
            />
              <TextField
              id="standard-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
              <br/>
              <br/>
              <Button variant="contained" color="primary" className={classes.button}>
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

export default withStyles(styles)(Login);
