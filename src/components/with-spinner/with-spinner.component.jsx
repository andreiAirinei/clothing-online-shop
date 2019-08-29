import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// component wrapping another component

// Making a HOC
// A function that takes some component that we want to wrap with the functionality of our spinner loading feature
// THAT wrapped component gets passed into this NEW component
// It determines based on 'isLoading' property that gets passed into this component:
// IF ITS LOADING : return my SpinnerOverlay
// IF FALSE : just render the component we passed in, as normal
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
