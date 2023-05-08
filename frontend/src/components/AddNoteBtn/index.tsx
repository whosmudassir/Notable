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
          padding: "12px 30px",
          borderRadius: "14px",
          backgroundColor: "#e8c5ff",

          borderWidth: "0px",
          color: "#403C38",
        }}
      >
        + Add note
      </Button>
    </div>
  );
};

export default AddNoteBtn;
