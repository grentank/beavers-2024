import React, { useContext, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import type { AddCharFormData } from '../../types/character';
import { TranslateContext } from '../../contexts/translate/context';
import { useCharactersHandlers } from '../../contexts/characters/hooks';

// type AddCharFormProps = {
//   addCharHandler: (formData: AddCharFormData) => Promise<void>;
// };

const defaultFormData: AddCharFormData<boolean> = {
  alive: false,
  image: '',
  name: '',
  type: '',
};

function AddCharForm(): JSX.Element {
  const [formData, setFormData] =
    useState<AddCharFormData<boolean>>(defaultFormData);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // console.log(formData);
  const translate = useContext(TranslateContext);
  const { addHandler: addCharHandler } = useCharactersHandlers();
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (!formData.image.startsWith('http')) return;
        void addCharHandler({
          ...formData,
          alive: formData.alive ? 'true' : '',
        }).then(() => setFormData(defaultFormData));
      }}
    >
      <FormGroup>
        <Label for="charName">{translate ? 'Имя' : 'Name'}</Label>
        <Input
          onChange={handleChange}
          value={formData.name}
          id="charName"
          name="name"
          placeholder={translate ? 'Имя' : 'Name'}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="charType">{translate ? 'Тип' : 'Type'}</Label>
        <Input
          onChange={handleChange}
          value={formData.type}
          id="charType"
          name="type"
          placeholder={translate ? 'Тип' : 'Type'}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="charImg">{translate ? 'Картинка' : 'Image'}</Label>
        <Input
          onChange={handleChange}
          value={formData.image}
          id="charImg"
          name="image"
          placeholder="http://..."
          type="text"
        />
      </FormGroup>

      <FormGroup>
        <Input
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, alive: e.target.checked }))
          }
          checked={formData.alive}
          type="checkbox"
          name="alive"
        />
        <Label>{translate ? 'Жив' : 'Alive'}</Label>
      </FormGroup>
      <Button type="submit">{translate ? 'Добавить' : 'Submit'}</Button>
    </Form>
  );
}

export default React.memo(AddCharForm);
