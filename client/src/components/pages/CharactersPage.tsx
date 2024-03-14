import React from 'react';
import { Col, Row } from 'reactstrap';
import { useLoaderData } from 'react-router-dom';
import AddCharForm from '../ui/AddCharForm';
import CharList from '../ui/CharList';

export default function CharactersPage(): JSX.Element {
  const data = useLoaderData();
  return (
    <>
      <Row>
        <Col xs="12">
          <AddCharForm />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <CharList />
        </Col>
      </Row>
    </>
  );
}
