import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import LikeButton from '../components/LikeButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50%",
    margin: "10% auto",
  },
  media: {
    paddingTop: "100%"
  },
  like: {
    marginLeft: "2%"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandText: {
    cursor: "pointer",
    marginLeft: "2%",
    userSelect: "none"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
}));

const PhotoCard = ({ photo }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={photo.url}
        title={photo.title}
      />
      <CardActions disableSpacing="true">
       <LikeButton className={classes.like} />
      </CardActions>
      <CardContent>
        <Typography variant="h6" align="left">
          {photo.title}
        </Typography>
        <Typography align="left">
          {photo.copyright ? 
            <p>Copyright: {photo.copyright}</p>
            :
            <p>Copyright: None</p>
          }
          <p>{photo.date}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing="true">
        <Typography className={classes.expandText} variant="subtitle2" onClick={handleExpand}>
          View description
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpand}
          disableRipple="true"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" align="left">
            {photo.explanation}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PhotoCard;