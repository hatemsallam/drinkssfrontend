import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import { withAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';
import FavDrinks from './FavDrinks'
import BestBooks from './BestBooks'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';

class App extends React.Component {

  render() {
    const  {isAuthenticated}= this.props.auth0
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated? <BestBooks/> : <Login/> }
              </Route>
              <Route exact path="/fav">
                {isAuthenticated? <FavDrinks/> : <Login/> }
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0 (App)
