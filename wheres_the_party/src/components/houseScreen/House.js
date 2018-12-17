import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Show from "./Show";

const styles = theme => ({
  card: {
    maxWidth: 800,
    margin: "auto"
  },
  media: {
    height: 100,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  show:{
    display:'flex',
    justifyContent: 'center'
  }
});

class House extends React.Component {
  state = { expanded: [], house: {}, shows: [] };

  componentDidMount() {
    fetch("http://localhost:8080/house/" + this.props.match.params.houseId)
      .then(response => response.json())
      .then(data => {
        this.setState({ house: data.data })
        fetch("http://localhost:8080/party/"+ this.props.match.params.houseId)
          .then(response => response.json())
          .then(data => this.setState({ shows: data.data},()=>{
            let expandedList = []
            for(let i=0;i < this.state.shows.length;i++){
              expandedList.push(false)
            }
            this.setState({expanded:expandedList});  
          }));
      });
  }

  renderData(data) {
    let dataFormated = new Date(data);
    let year = dataFormated.getFullYear();
    let month = dataFormated.getMonth();
    let day = dataFormated.getDate();
    console.log(dataFormated); 
    console.log(month);
    return(
      
      (year ? year : "") +
                "/" +
      (month ? (month + 1) : "") +
                "/" +
        (day ? day : "")
      
    )
  }

  handleExpandClick = (e,index) => {
    console.log("entrou")
    console.log("chamou " + index)
    let expandedMap = this.state.expanded.map((expanded,i)=>{
      if(index == i){
        expanded = !expanded;
      }
      return expanded;
    })
    this.setState(({ expanded: expandedMap }));
  };


  render() {
    const { classes } = this.props;
    const { name, description, address, contact, imageUrl } = this.state.house;
    const { shows } = this.state;

    const showList = shows.map((show, index)=>(
      <div>
        <CardActions className={classes.actions} disableActionSpacing>
            <Button
              style={{ width: "100%" }}
              onClick={(e) => {
                this.handleExpandClick(e, index)
           }}
              className={classes.button}
            >
              <div className={classes.show}>
              {show.date ? this.renderData(show.date) : "" }
              </div>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded[index]
                })}
                aria-expanded={this.state.expanded[index]}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Button>
          </CardActions>
          <Collapse in={this.state.expanded[index]} timeout="auto" unmountOnExit>
          <div  className={classes.show}>
            <Show key={ this.state.shows[index]._id} eCard name={this.state.shows[index].name} description={ this.state.shows[index].description } img = { this.state.shows[index].imageUrl}></Show>
          </div>
          </Collapse>
        </div>
    ))

    return (
      <Card className={classes.card}>
        <CardHeader title={name} subheader={contact + " - " + address} />
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={name}
        />
        <CardContent>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
        <div>
          {(shows.length !=0) ? showList : <Typography component="p" style={{color:'red'}}>NÃO EXISTEM SHOWS CADASTRADOS</Typography> }
        </div>
        
      </Card>
    );
  }
}

House.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(House);
