import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, Container, NavItem, NavbarText, Button} from 'reactstrap';
import Cookie from 'universal-cookie';

const Header = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const cookies = new Cookie();

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  const onLogout = ()=>{
    cookies.remove('token');
    window.location.assign('/');
  };
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">UpTrack.io</NavbarBrand>
          <NavbarToggler onClick={toggleOpen} />
          <Collapse isOpen={isOpen} navbar>
            <Container className="themed-container" fluid="md">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/">HOME</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/plans">PLANS</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/pages">PAGES</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/sitemaps">SITEMAPS</NavLink>
                </NavItem>
              </Nav>
            </Container>
          </Collapse>
          <NavbarText>
              <Button color="primary" outline onClick = {onLogout}>Log out</Button>
          </NavbarText>
        </Navbar>
      </div>
    );
}

export default Header;