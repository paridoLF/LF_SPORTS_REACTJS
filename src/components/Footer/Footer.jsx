/*!

=========================================================
* LF SPORTS v1.0.0
=========================================================

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="javascript:void(0)">About Us</NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} by{" "}
            <a
              href="javascript:void(0)"
              rel="noopener noreferrer"
              target="_blank"
            >
              Luis Fernando Perez Araya
            </a>{" "}
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
