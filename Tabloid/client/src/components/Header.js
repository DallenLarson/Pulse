import React, { useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { logout } from '../modules/authManager';
import PulseIcoWhite from './PulseIcoWhite.png'; // Import the image
import './header.css'; // Import the custom CSS file

export default function Header({ isLoggedIn, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="danger" light expand="md">
        {/* Use the image as the NavbarBrand */}
        <NavbarBrand tag={RRNavLink} to="/">
          <img src={PulseIcoWhite} alt="Pulse Logo" style={{ width: '50px', height: '50px' }} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <>

              </>
            )}
            {role === 'Admin' && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories" style={{ color: 'white' }}>
                    Categories
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tags" style={{ color: 'white' }}>
                    Tags
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/users" style={{ color: 'white' }}>
                    Users
                  </NavLink>
                </NavItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ color: 'white', cursor: 'pointer' }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login" style={{ color: 'white' }}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register" style={{ color: 'white' }}>
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
