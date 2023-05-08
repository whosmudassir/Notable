import React, { useEffect, useState } from "react";

import "./App.css";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const resp = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await resp.json();
        setNotes(notes);
        console.log(notes);
      } catch (e) {
        alert(e);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Row xs={1} md={2} xl={3}>
          {notes.map((note) => (
            <Col>
              <Note note={note} key={note._id} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
