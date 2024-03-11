import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import type { AddCharFormData } from '../../types/character';

type AddCharFormProps = {
  addCharHandler: (formData: AddCharFormData) => Promise<void>;
};

const defaultFormData: AddCharFormData<boolean> = {
  alive: false,
  image: '',
  name: '',
  type: '',
};

function AddCharForm({ addCharHandler }: AddCharFormProps): JSX.Element {
  const [formData, setFormData] =
    useState<AddCharFormData<boolean>>(defaultFormData);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  console.log(formData);
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
        <Label for="charName">Name</Label>
        <Input
          onChange={handleChange}
          value={formData.name}
          id="charName"
          name="name"
          placeholder="Name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="charType">Type</Label>
        <Input
          onChange={handleChange}
          value={formData.type}
          id="charType"
          name="type"
          placeholder="Type"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="charImg">Image</Label>
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
        <Label>Alive</Label>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default React.memo(AddCharForm);
