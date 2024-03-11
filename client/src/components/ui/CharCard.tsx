import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import type { CharacterType } from '../../types/character';

type CharCardProps = {
  char: CharacterType;
  handleDelete: (id: number) => void;
};

function CharCard({ char, handleDelete }: CharCardProps): JSX.Element {
  console.log('Card render', char.id);
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
          Delete
        </Button>
      </CardBody>
    </Card>
  );
}

export default React.memo(CharCard);
