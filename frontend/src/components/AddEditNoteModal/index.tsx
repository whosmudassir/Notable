import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import AddNoteBtn from "../AddNoteBtn";
import { useForm } from "react-hook-form";
import { createNote, updateSingleNote } from "../../network/notes_api";
import { NoteInput } from "../../network/notes_api";
import { Note } from "../../models/note";

interface AddEditNoteModalProps {
  noteToEdit?: Note;
  onClose: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteModal = ({
  noteToEdit,
  onClose,
  onNoteSaved,
}: AddEditNoteModalProps) => {
  //form submit
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await updateSingleNote(noteToEdit._id, input);
      } else {
        noteResponse = await createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (e) {
      console.log("error", e);
      alert(e);
    }
  }

  return (
    <div>
      <Modal
        fullscreen={true}
        show
        onHide={onClose}
        centered
        contentClassName={styles.modalWrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {noteToEdit ? "Edit Note" : "Your New Note"}
          </Modal.Title>
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
                rows={16}
                placeholder="Text"
                {...register("text")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles.primaryBtn}
            type="submit"
            form="addNoteForm"
            disabled={isSubmitting}
          >
            {noteToEdit ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEditNoteModal;
