import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import '../App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const NavBar=(props)=>{
  const { classes } = props;
    return(
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" color="inherit" style={{textAlign:"left"}} className={classes.grow}>
            TrainMe
          </Typography>
          <Button color="inherit"><Link to="/" style={{color:"white",textDecoration:"none"}}>Home</Link>{''}</Button>
        </Toolbar>
        </AppBar>
      </div>
    )
  }

export default withStyles(styles)(NavBar);