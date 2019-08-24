// { css } - allows us to write a block of css that we can pass in and render as CSS inside of any of our styled components

import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Repeated block of code used later on
// Almost like a shared function

// import { css } from 'styled-components';
// const OptionsContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// Extending style components into components
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
