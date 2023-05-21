import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import AddNoteBtn from "../AddNoteBtn";
import { useForm } from "react-hook-form";
import { createNote } from "../../network/notes_api";
import { NoteInput } from "../../network/notes_api";
import { Note } from "../../models/note";

interface AddNoteModalProps {
  onNoteSaved: (note: Note) => void;
}

const AddNoteModal = ({ onNoteSaved }: AddNoteModalProps) => {
  const [show, setShow] = useState(false);

  //form submit
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await createNote(input);
      console.log(noteResponse.json);
      onNoteSaved(noteResponse);
      setShow(false);
    } catch (e) {
      console.log("error", e);
      alert(e);
    }
  }

  //modal open/close
  const onClose = () => {
    setShow(false);
  };

  const onOpen = () => {
    setShow(true);
  };

  return (
    <div>
      <AddNoteBtn onClick={onOpen} />

      <Modal
        show={show}
        onHide={onClose}
        centered
        contentClassName={styles.modalWrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                isInvalid={!!errors.title}
                {...register("title", { required: "Required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Text"
                {...register("text")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
