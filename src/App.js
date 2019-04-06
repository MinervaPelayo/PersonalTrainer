import React, { Component } from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';


class App extends Component {
  
  render() {
  
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/customers" component={Customers}/>
              <Route path="/trainings" component={Trainings}/>
              <Route render={() => <h1>Page not found</h1>}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
