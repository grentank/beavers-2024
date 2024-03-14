import React from 'react';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import type { LoginForm } from '../../types/auth';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk } from '../../redux/slices/auth/thunks';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as LoginForm;
    void dispatch(loginThunk(formData)).then(() => navigate('/characters'));
    // dispatch(loginAction(formData)).then(() => navigate('/'))
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="row-cols-lg-auto g-3 align-items-center">
        <Col>
          <Label className="visually-hidden" for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="something@idk.cool"
            type="email"
          />
        </Col>
        <Col>
          <Label className="visually-hidden" for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="don't tell!"
            type="password"
          />
        </Col>
        <Col>
          <Button>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}
