import React from 'react';

import './form-input.styles.scss';

// Component : input & label together
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {// label prop - we are going to actually selectively render a label
    // we don't know if we actually need it or not
    // if a label is passed, it will be generated
    label ? (
      <label
        // If the user has typed anything in, then we will have the 'shrink' class included
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
