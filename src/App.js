import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Movies from './components/movies';
import NotFound from './components/notFound';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Navbar from './components/navbar';
import MovieFrom from './components/movieForm';
// import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={ MovieFrom }></Route>
          <Route path="/movies" component={ Movies }></Route>
          <Route path="/customers" component={ Customers }></Route>
          <Route path="/rentals" component={ Rentals }></Route>
          <Route path="/not-found" component={ NotFound }></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
