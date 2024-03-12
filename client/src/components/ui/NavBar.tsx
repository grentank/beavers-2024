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
import useToggleTranslate from '../../contexts/translate/hooks';
import { TranslateContext } from '../../contexts/translate/context';

export default function NavBar(): JSX.Element {
  const toggle = useToggleTranslate();
  const translate = useContext(TranslateContext);
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">{translate ? 'Бобры' : 'Beavers'}</NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">{translate ? 'Главная' : 'Main'}</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <FormGroup switch>
              <Input
                type="switch"
                checked={translate}
                role="switch"
                onChange={toggle}
              />
              <Label check>RU/EN</Label>
            </FormGroup>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
