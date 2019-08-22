import React from 'react';

import { Link } from 'react-router-dom';
// connect - is a HOC
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {/* Sign in / Log Out */}
      {currentUser ? (
        <Link className='option' onClick={() => auth.signOut()} to='/'>
          SIGN OUT
        </Link>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// this state is the root reducer
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

// ###### New mapStateToProps after using RESELECT / SELECTORS
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// });

// SAME - we don't need to pass state with createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

// connect - allows us to access the state, with the state being our root reducer
export default connect(mapStateToProps)(Header);
