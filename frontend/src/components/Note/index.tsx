import React, { useState } from "react";
import { Note as NoteModel } from "../../models/note";
import { Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import { dateFormatter } from "../../util/dateFortmatter";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onDeleteNote: (note: NoteModel) => void;
  onEditNote: (note: NoteModel) => void;
}
const Note = ({ note, onDeleteNote, onEditNote }: NoteProps) => {
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
        fullscreen={true}
        show={show}
        onHide={handleClose}
        centered
        contentClassName={styles.modalWrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {note.title}
          </Modal.Title>

          <MdModeEdit
            size={24}
            style={{ marginRight: "14px", cursor: "pointer" }}
            className="text-muted"
            onClick={() => onEditNote(note)}
          />
          <MdDelete
            size={24}
            style={{ marginRight: "14px", cursor: "pointer" }}
            className="text-muted"
            onClick={(e) => {
              onDeleteNote(note);
              e.stopPropagation();
            }}
          />
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
