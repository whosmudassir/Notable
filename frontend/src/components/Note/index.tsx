import React, { useState } from "react";
import { Note as NoteModel } from "../../models/note";
import { Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";

interface NoteProps {
  note: NoteModel;
}
const Note = ({ note }: NoteProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card onClick={handleShow} className={styles.cardStyles}>
        {note.title}
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        contentClassName={styles.modalWrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {note.title} -- {note.createdAt}
          </Modal.Title>
          <p>{note.createdAt}</p>
          <p>{note.updatedAt}</p>
        </Modal.Header>
        <Modal.Body> {note.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Note;
