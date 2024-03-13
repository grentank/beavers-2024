import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearSelectedChar,
  editChar,
} from '../../redux/slices/characters/slice';
import charService from '../../services/charService';

export default function CharEditModal(): JSX.Element {
  const selectedChar = useAppSelector((store) => store.characters.selectedChar);
  const dispatch = useAppDispatch();
  const closeModal = (): void => {
    dispatch(clearSelectedChar());
  };

  const [newName, setNewName] = useState('');
  useEffect(() => {
    if (selectedChar) setNewName(selectedChar.name);
  }, [selectedChar]);

  const editHandler = (): void => {
    if (!selectedChar) return;
    charService
      .editChar({ ...selectedChar, name: newName })
      .then((newChar) => {
        dispatch(editChar(newChar));
        closeModal();
      })
      .catch(console.log);
  };

  return (
    <div>
      <Modal isOpen={!!selectedChar} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="charName">Имя</Label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              id="charName"
              name="name"
              placeholder="Имя"
              type="text"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editHandler}>
            Сохранить
          </Button>{' '}
          <Button color="secondary" onClick={closeModal}>
            Отменить
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
