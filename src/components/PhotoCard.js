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
  content: {
    padding: "2%",
  },
  description: {
    marginLeft: "auto"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandText: {
    cursor: "pointer",
    userSelect: "none",
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    }
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
      {photo.media_type === "image" ? 
        <CardMedia
          className={classes.media}
          image={photo.url}
          title={photo.title}
        />
        :
        <Typography variant="body2">
          "Video cannot be played."
        </Typography>
      }
      <CardActions disableSpacing>
      </CardActions>
      <CardContent className={classes.content}>
        <Typography variant="h6" align="left">
          {photo.title}
        </Typography>
        <Typography variant="body2" align="left">
          {photo.copyright ? 
            <span>&copy; {photo.copyright}</span>
            :
            <span></span>
          }
        </Typography>
        <Typography variant="body2" align="left">
          <span>{photo.date}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton className={classes.icon} disableRipple>
          <LikeButton />
        </IconButton>
        <IconButton 
          className={`${classes.description} ${classes.icon}`} 
          onClick={handleExpand}
          disableRipple
        >
          <Typography variant="subtitle2">
              View description
          </Typography>
          <ExpandMoreIcon 
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
          />
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