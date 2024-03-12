import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import type { CharacterType } from '../../types/character';
import { TranslateContext } from '../../contexts/translate/context';
import { useCharactersHandlers } from '../../contexts/characters/hooks';

type CharCardProps = {
  char: CharacterType;
  // handleDelete: (id: number) => void;
};

function CharCard({ char }: CharCardProps): JSX.Element {
  const translate = useContext(TranslateContext);
  const { deleteHandler: handleDelete } = useCharactersHandlers();
  // console.log('Card render. Context:', translate);
  return (
    <Card
      style={{
        width: '18rem',
      }}
    >
      <img alt="Sample" src={char.image} />
      <CardBody>
        <CardTitle tag="h5">{char.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {char.type}
        </CardSubtitle>
        <CardText>{char.alive ? 'Alive' : 'Dead'}</CardText>
        <Button color="danger" onClick={() => handleDelete(char.id)}>
          {translate ? 'Удалить' : 'Delete'}
        </Button>
      </CardBody>
    </Card>
  );
}

export default React.memo(CharCard);
