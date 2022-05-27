import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

// Navbar Content
const Navi = () => {
  return (
    <div>
      <Navbar variant="dark" className="nav">
        <Container>
          <Navbar.Brand href="/">Face Meet</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/register">Host</Nav.Link>
            <Nav.Link href="/recognition">Join</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navi;
