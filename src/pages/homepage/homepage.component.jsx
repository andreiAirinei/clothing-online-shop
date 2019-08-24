import React from 'react';

import Directory from '../../components/directory/directory.component';

// CSS in JS
import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;

// ### BEFORE CSS in JS
// import './homepage.styles.scss';

// const HomePage = () => (
//   <div className='homepage'>
//     <Directory />
//   </div>
// );
