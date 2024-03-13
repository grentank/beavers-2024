import React, { useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

export default function NavBar(): JSX.Element {
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">Бобры</NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Главная</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>RU/EN</Label>
            </FormGroup>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
