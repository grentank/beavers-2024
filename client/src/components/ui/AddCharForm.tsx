import React, { useContext, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import type { AddCharacterForm } from '../../types/character';
import charService from '../../services/charService';
import { useAppDispatch } from '../../redux/hooks';
import { addCharacter } from '../../redux/slices/characters/slice';

function AddCharForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData) as AddCharacterForm;

    charService
      .createNewChar({ ...body, alive: body.alive === 'on' })
      .then((newChar) => {
        dispatch(addCharacter(newChar));
        event.currentTarget.reset();
      })
      .catch(console.log);
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <Label for="charName">Имя</Label>
        <Input id="charName" name="name" placeholder="Имя" type="text" />
      </FormGroup>
      <FormGroup>
        <Label for="charType">Тип</Label>
        <Input id="charType" name="type" placeholder="Тип" type="text" />
      </FormGroup>
      <FormGroup>
        <Label for="charImg">Картинка</Label>
        <Input id="charImg" name="image" placeholder="http://..." type="text" />
      </FormGroup>

      <FormGroup>
        <Input type="checkbox" name="alive" />
        <Label>Жив</Label>
      </FormGroup>
      <Button type="submit">Добавить</Button>
    </Form>
  );
}

export default React.memo(AddCharForm);
