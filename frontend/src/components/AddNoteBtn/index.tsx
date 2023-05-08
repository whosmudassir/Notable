import React from "react";
import { Button } from "react-bootstrap";

const AddNoteBtn = () => {
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
        style={{
          padding: "12px 20px",
          borderRadius: "12px",
          backgroundColor: "#e8c5ff",
          borderColor: "#403C38",
          borderWidth: "1.5px",
          color: "#403C38",
        }}
      >
        + Add note
      </Button>
    </div>
  );
};

export default AddNoteBtn;
