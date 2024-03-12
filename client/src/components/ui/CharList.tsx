import React from 'react';
import { Col, Row } from 'reactstrap';
// import type { CharacterType } from '../../types/character';
import CharCard from './CharCard';
import { useCharactersContext } from '../../contexts/characters/hooks';

// type CharListProps = {
//   characters: CharacterType[];
//   handleDelete: (id: number) => void;
// };

export default function CharList(): JSX.Element {
  const characters = useCharactersContext();
  return (
    <Row>
      {characters.map((char) => (
        <Col xs="4" key={char.id}>
          <CharCard char={char} />
        </Col>
      ))}
    </Row>
  );
}
