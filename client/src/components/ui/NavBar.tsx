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
import { NavLink as RouterLink } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  const navs = [
    { name: 'Главная', link: '/' },
    { name: 'Персонажи', link: '/characters' },
  ];
  return (
    <div>
      <Navbar color="light" expand>
        <NavbarBrand href="/">Бобры</NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen={false} navbar>
          <Nav className="me-auto" navbar>
            {navs.map((nav) => (
              <NavItem key={nav.name}>
                <NavLink tag={RouterLink} to={nav.link}>
                  {nav.name}
                </NavLink>
              </NavItem>
            ))}
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
