import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from "react-toastify"

import RegisterForm from './components/registerForm';
import Movies from './components/movies';
import NotFound from './components/notFound';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Navbar from './components/navbar';
import MovieFrom from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout'
import ProtectedRoute from './components/common/proptectedRoute';
import auth from './services/authService'
import "react-toastify/dist/ReactToastify.min.css"
// import './App.css';

function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    const cUser = auth.getCurrentUser()
    setUser(cUser)

  }, [])

  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar user={ user } />
      <main className="container">
        <Switch>
          <Route path="/register" component={ RegisterForm } />
          <Route path="/login" component={ LoginForm }></Route>
          <Route path="/logout" component={ Logout }></Route>
          <ProtectedRoute path="/movies/:id" component={ MovieFrom } />
          <Route path="/movies" render={ props => <Movies { ...props } user={ user } /> }></Route>
          <Route path="/customers" component={ Customers }></Route>
          <Route path="/rentals" component={ Rentals }></Route>
          <Route path="/not-found" component={ NotFound }></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment >
  );
}

export default App;
