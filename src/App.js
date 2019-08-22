import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
// Even though we only have ONE selectet property, we should still use createStructuredSelector because in the future we need to pull in more, it would be easy to add more
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // Destructuring props
    const { setCurrentUser } = this.props;
    // Inside it takes a function where the parameter is what the user state is of the auth of our firebase project
    // Make it ASYNC because we will make a potential API request to our Firestore
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // similar to onStateChange
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          // console.log(snapShot);
          // console.log(snapShot.data());
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckOutPage} />
          {/* Redirect if there is a user logged in */}
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  // Passes an action object that is going to be passed to every reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
