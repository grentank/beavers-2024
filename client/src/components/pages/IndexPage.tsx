import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import AddCharForm from '../ui/AddCharForm';
import CharList from '../ui/CharList';
import NavBar from '../ui/NavBar';
import CharEditModal from '../ui/CharEditModal';

export default function IndexPage(): JSX.Element {
  return (
    <>
      <Container>
        <Row>
          <Col xs="12">
            <NavBar />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <AddCharForm />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <CharList />
          </Col>
        </Row>
      </Container>
      <CharEditModal />
    </>
  );
}
