import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
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

 class ProfileForm extends React.Component {
    state = {
      name: '',
      email:'',
      house: {
        name: '',
        description: '',
        address: '',
        contact: ''
      },
      savedState:{}
    };
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
    handleHouseChange = name => event => {
      this.setState({
        house: {...this.state.house, [name]: event.target.value}
      })
    }
    componentDidMount() {
    let token = localStorage.getItem('token');
    console.log(token);
        fetch('http://localhost:8080/user/myProfile', {
            method: 'GET',
             headers:{
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Accept' : 'application/json',
                'Authorization': token
                }
     }).then(response => response.json())
      .then(data =>{
       this.setState(data, ()=>{this.setState({savedState:data});});
      });
    }

     handleSubmit = (event) => {
        let token = localStorage.getItem('token');
        console.log(token);
            fetch('http://localhost:8080/user', {
                method: 'PUT',
                 headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Accept' : 'application/json',
                    'Authorization': token
                    },
                body:JSON.stringify(this.state)
         }).then(response => response.json())
          .then(data =>{
            
          });
    };

  handleCancel = () => {
    console.log("comassim");
    console.log(this.state);
    this.setState(this.state.savedState,()=>{    console.log(this.state);
    });
  }
  render() {
    const { classes } = this.props;
      return (
      <div className={classes.div}>
        <h1>Profile Edit</h1>
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
            id="standard-email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            />
            <TextField
            id="standard-house-name"
            label="House Name"
            className={classes.textField}
            value={this.state.house.name}
            onChange={this.handleHouseChange('name')}
            margin="normal"
            variant="filled"
            style={{ margin: 8 }}
            />
            <TextField
            id="standard-description"
            label="House description"
            className={classes.textField}
            value={this.state.house.description}
            onChange={this.handleHouseChange('description')}
            margin="normal"
            variant="filled"
            style={{ margin: 8 }}
            />
            <TextField
            id="standard-house-address"
            label="House Address"
            className={classes.textField}
            value={this.state.house.address}
            onChange={this.handleHouseChange('address')}
            margin="normal"
            variant="filled"
            fullWidth
            style={{ margin: 8 }}
            />
            <TextField
            id="standard-contact"
            label="House Contact"
            className={classes.textField}
            value={this.state.house.contact}
            onChange={this.handleHouseChange('contact')}
            margin="normal"
            variant="filled"
            fullWidth
            style={{ margin: 8 }}
            />
            <Button  variant="contained" color="primary" label="Submit" type="submit" style={{ marginRight: 8, marginBottom:10 }}>
            Update
            </Button> 
            <Button  variant="contained" color="secondary" label="Cancel" onClick={this.handleCancel} style={{ marginRight: 8, marginBottom:10 }}>
            Cancel
            </Button>    

        </form>
      </div>
      )
  };
}

ProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileForm);