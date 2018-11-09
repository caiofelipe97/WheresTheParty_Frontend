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
  }
});

class House extends React.Component {
  state = { expanded: [false,false], house: {}, shows: [] };

  componentDidMount() {
    fetch("http://localhost:8080/house/" + this.props.match.params.houseId)
      .then(response => response.json())
      .then(data => {
        this.setState({ house: data.data })
        fetch("http://localhost:8080/party/"+ this.props.match.params.houseId)
          .then(response => response.json())
          .then(data => this.setState({ shows: data.data}));
      });
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
            
              {show.date ? show.date : "" +
                "/" +
                (show.date? show.date.getMonth() + 1 : "") +
                "/" +
                show.date? show.date.getDate() : "" }
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
            <CardContent>
              <Typography paragraph>{this.state.shows[index].name}</Typography>
              
            </CardContent>
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
        
        { showList }
        
      </Card>
    );
  }
}

House.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(House);
