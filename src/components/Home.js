import React from 'react';
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const styles = {
    card: {
      width: 300,
      marginTop: 100,
    },
    title:{
        marginTop: 100,
    }
  };

const Home=(props)=>{

    const { classes } = props;

    return(
      <div>
        <Typography variant="h2" className={classes.title}>Welcome back !</Typography>
        <Grid container spacing={40} justify="center">
            <Grid item>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h3">
                        Customers
                        </Typography>
                    </CardContent>
                    <CardActions>  
                        <Button variant="contained" color="primary" size="medium"><Link to="/customers" style={{color:"white",textDecoration:"none"}}>Show</Link>{''}</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h3">
                        Trainings
                        </Typography>
                    </CardContent>
                    <CardActions>  
                        <Button variant="contained" color="primary" size="medium"><Link to="/trainings" style={{color:"white",textDecoration:"none"}}>Show</Link>{''}</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h3">
                        Calendar
                        </Typography>
                    </CardContent>
                    <CardActions>  
                        <Button variant="contained" color="primary" size="medium"><Link to="/calendar" style={{color:"white",textDecoration:"none"}}>Show</Link>{''}</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
      </div>
    )
  }
export default withStyles(styles)(Home);
