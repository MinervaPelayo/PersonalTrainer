import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import CalendarView from './components/CalendarView';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends Component {
  
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        {
          user
            ? <div>
              <BrowserRouter>
                <div>
                  <NavBar signOut={signOut} user={user}/>
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/customers" component={Customers}/>
                    <Route path="/trainings" component={Trainings}/>
                    <Route path="/calendar" component={CalendarView}/>
                    <Route render={() => <h1>Page not found</h1>}/>
                  </Switch>
                </div>
              </BrowserRouter>
              </div>
            : <div>
                <Grid container justify="center" style={{marginTop:"60px"}}>
                  <Card>
                    <CardContent>
                      <Typography variant="h2">Please sign in</Typography>
                    </CardContent>
                    <CardActions> 
                      <Button variant="contained" size="large" color="primary" onClick={signInWithGoogle}>Sign in with Google</Button>
                    </CardActions> 
                  </Card>
                </Grid>
              </div>
        }
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
