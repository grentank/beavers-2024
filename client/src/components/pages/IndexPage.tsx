import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import AddCharForm from '../ui/AddCharForm';
import CharList from '../ui/CharList';
// import type { AddCharFormData, CharacterType } from '../../types/character';
// import charService from '../../services/characterService';
import NavBar from '../ui/NavBar';
// import CharactersProvider from '../../contexts/characters/CharactersProvider';

export default function IndexPage(): JSX.Element {
  return (
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
  );
}
