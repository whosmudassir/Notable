import React from "react";
import { Button } from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import { FaPlus } from "react-icons/fa";

interface AddNoteBtnProps {
  onClick: () => void;
}

const AddNoteBtn = ({ onClick }: AddNoteBtnProps) => {
  return (
    <div
      style={{
        marginBottom: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        size="sm"
        className={styles.primaryBtn}
        onClick={onClick}
        style={{
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        <FaPlus fontSize={"12px"} /> Add note
      </Button>
    </div>
  );
};

export default AddNoteBtn;
