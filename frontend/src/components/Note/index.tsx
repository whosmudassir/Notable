import React, { useState } from "react";
import { Note as NoteModel } from "../../models/note";
import { Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import { dateFormatter } from "../../util/dateFortmatter";

interface NoteProps {
  note: NoteModel;
}
const Note = ({ note }: NoteProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let updatedDate: string;

  if (note.updatedAt > note.createdAt) {
    updatedDate = "Updated at : " + dateFormatter(note.updatedAt);
  } else {
    updatedDate = "Created at : " + dateFormatter(note.createdAt);
  }

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
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body> {note.text}</Modal.Body>
        {note.createdAt && (
          <Modal.Footer
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <p>{updatedDate}</p>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default Note;
