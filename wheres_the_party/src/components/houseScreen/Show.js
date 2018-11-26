import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    maxWidth: 500,
    marginRight: '10px',
    marginTop: '20px'
  },
  media: {
    height: 350,
    width : 500
  },
};

function Show(props) {
  const { classes, name, description, img } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography component="p">
          {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Show.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Show);