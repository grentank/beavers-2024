import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import AddCharForm from '../ui/AddCharForm';
import CharList from '../ui/CharList';
import type { AddCharFormData, CharacterType } from '../../types/character';
import charService from '../../services/characterService';

export default function IndexPage(): JSX.Element {
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    charService.getChars().then(setCharacters).catch(console.log);
  }, []);

  const addCharHandler = useCallback(
    async (formData: AddCharFormData): Promise<void> => {
      const newChar = await charService.createNewChar(formData);
      setCharacters((prev) => [newChar, ...prev]);
    },
    [],
  );

  const handleDelete = useCallback((id: number): void => {
    charService
      .deleteById(id)
      .then(() =>
        setCharacters((prev) => prev.filter((char) => char.id !== id)),
      )
      .catch(console.log);
  }, []);

//   const obj = useMemo(() => {
//     const a = 3;
//     return { a };
//   }, []);

  return (
    <Container>
      <Row>
        <Col xs="6">
          <AddCharForm addCharHandler={addCharHandler} />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <CharList characters={characters} handleDelete={handleDelete} />
        </Col>
      </Row>
    </Container>
  );
}
