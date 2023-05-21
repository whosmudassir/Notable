import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import AddNoteBtn from "../AddNoteBtn";

const AddNoteModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <AddNoteBtn onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        centered
        contentClassName={styles.modalWrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addNoteForm">
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={8} placeholder="Your note " />
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* {note.createdAt && (
          <Modal.Footer
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <p>{updatedDate}</p>
          </Modal.Footer>
        )} */}
      </Modal>
    </div>
  );
};

export default AddNoteModal;
