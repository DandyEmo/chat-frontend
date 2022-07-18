import React from 'react';
import { Nav, Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import { useLogoutUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  const user = useSelector(state => state.user);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async e => {
    e.preventDefault(e);
    await logoutUser(user);
    //redirect to home page
    window.location.replace('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Chatty</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* If not user don't show */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {/* if user show drop down */}
            {user && (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
