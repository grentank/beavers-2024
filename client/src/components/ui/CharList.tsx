import React from 'react';
import { Col, Row } from 'reactstrap';
import type { CharacterType } from '../../types/character';
import CharCard from './CharCard';

type CharListProps = {
  characters: CharacterType[];
  handleDelete: (id: number) => void
};

export default function CharList({ characters, handleDelete }: CharListProps): JSX.Element {
  return (
    <Row>
      {characters.map((char) => (
        <Col xs="4" key={char.id}>
          <CharCard char={char} handleDelete={handleDelete} />
        </Col>
      ))}
    </Row>
  );
}
