import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card, Modal, Button } from "react-bootstrap";
import { User } from "../../models/user";
import styles from "../../styles/Note.module.css";
import { useForm } from "react-hook-form";
import { SignUpCredentials, signUp } from "../../network/notes_api";

interface SignupModalProps {
  onClose: () => void;
  onSignupSuccess: (user: User) => void;
}

const SignupModal = ({ onClose, onSignupSuccess }: SignupModalProps) => {
  //form submit
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  //on submit of form
  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await signUp(credentials);
      onSignupSuccess(newUser);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {" "}
      <Modal
        show
        onHide={onClose}
        centered
        contentClassName={styles.modalWrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <Form id="addNoteForm" onSubmit={() => null}>
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
          <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
            {noteToEdit ? "Save" : "Add"}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default SignupModal;
