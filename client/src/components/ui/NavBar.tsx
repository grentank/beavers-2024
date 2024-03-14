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
  Button,
} from 'reactstrap';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/auth/thunks';

export default function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.auth.user);
  const navs =
    user.status === 'guest'
      ? [
          { name: 'Главная', link: '/' },
          { name: 'Логин', link: '/login' },
          { name: 'Регистрация', link: '/signup' },
        ]
      : [
          { name: 'Главная', link: '/' },
          { name: 'Персонажи', link: '/characters' },
        ];
  const logoutHandler = (): void => {
    void dispatch(logoutThunk()).then(() => navigate('/'));
  };
  return (
    <div>
      <Navbar color="light" expand>
        <NavbarBrand href="/">
          {user.status === 'logged' ? user.name : 'Гость'}
        </NavbarBrand>
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
            {user.status === 'logged' && (
              <NavItem key="logout">
                <NavLink tag={Button} onClick={logoutHandler}>
                  Выйти
                </NavLink>
              </NavItem>
            )}
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
