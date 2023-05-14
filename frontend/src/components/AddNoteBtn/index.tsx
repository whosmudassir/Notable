import React from "react";
import { Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";

const AddNoteBtn = () => {
  return (
    <div
      style={{
        marginBottom: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button size="sm" className={styles.primaryBtn}>
        + Add note
      </Button>
    </div>
  );
};

export default AddNoteBtn;
