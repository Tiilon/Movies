import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import MovieForm from './components/movieForm';
import Navbar from './components/navbar';
import Movies from './components/movies';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/notFound';
import React from 'react';
import LoginForm from './components/login';
import RegisterForm from './components/register';

function App() {
  return (
    <React.Fragment>
      <main>
      <Navbar/>
      <div className="row">
        <div className="m-5 col-md-8">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/movies"/>
            <Redirect to="not-found"/>
          </Switch>
        </div>
      </div>
    </main>
    </React.Fragment>
    
  );
}

export default App;
