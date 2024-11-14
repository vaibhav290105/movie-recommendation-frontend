import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #282c34;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <h1 style={{ color: 'white' }}>Movie Recommendations</h1>
      <div>
        <NavbarLink to="/home">Home</NavbarLink>
        <NavbarLink to="/favorites">Favorites</NavbarLink>
        <NavbarLink to="/">Login</NavbarLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
