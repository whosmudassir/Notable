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
        <Modal.Body>
          <Form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                isInvalid={!!errors?.username}
                placeholder="Username"
                {...register("username", { required: "Required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: "Required" })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                isInvalid={!!errors?.password}
                placeholder="Password"
                {...register("password", { required: "Required" })}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            form="signupForm"
            disabled={isSubmitting}
            style={{ width: "100%", padding: "14px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignupModal;
