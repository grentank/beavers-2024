import React, { useContext, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import type { AddCharacterForm, CharacterType } from '../../types/character';
import charService from '../../services/charService';
import { useAppDispatch } from '../../redux/hooks';
import { addCharacter } from '../../redux/slices/characters/slice';
import CharCard from './CharCard';

function AddCharForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [cardData, setCardData] = useState<Omit<CharacterType, 'id'>>({
    name: '',
    type: '',
    image: '',
    alive: false,
  });

  const hangleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setCardData({ ...cardData, [event.target.name]: event.target.value });

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData) as AddCharacterForm;

    charService
      .createNewChar({ ...body, alive: body.alive === 'on' })
      .then((newChar) => {
        dispatch(addCharacter(newChar));
        setCardData({ name: '', type: '', image: '', alive: false });
        // event.currentTarget.reset();
      })
      .catch(console.log);
  };
  console.log(cardData);
  return (
    <Row>
      <Col xs="6">
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label for="charName">Имя</Label>
            <Input
              value={cardData.name}
              onChange={hangleChange}
              id="charName"
              name="name"
              placeholder="Имя"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="charType">Тип</Label>
            <Input
              value={cardData.type}
              onChange={hangleChange}
              id="charType"
              name="type"
              placeholder="Тип"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="charImg">Картинка</Label>
            <Input
              value={cardData.image}
              onChange={hangleChange}
              id="charImg"
              name="image"
              placeholder="http://..."
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Input
              checked={cardData.alive}
              onChange={() =>
                setCardData((prev) => ({ ...prev, alive: !prev.alive }))
              }
              type="checkbox"
              name="alive"
            />
            <Label>Жив</Label>
          </FormGroup>
          <Button type="submit">Добавить</Button>
        </Form>
      </Col>
      <Col xs="6">
        <CharCard char={{ ...cardData, id: 0 }} />
      </Col>
    </Row>
  );
}

export default React.memo(AddCharForm);
