import React from 'react';

// Higher Order Component
// It's a function that takes any Component as an argument and returns a modified component
// A function that gives you back a powered up Component

// This withRouter will make us avoid props tunneling / drilling
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// match - is the current directory we are in ?!
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`menu-item ${size}`}
    // URL history
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

// Return a superpowered MenuItem Component with access now to those locations, maps and history props that we need access to
export default withRouter(MenuItem);
