import React, { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";
import AddNoteBtn from "./components/AddNoteBtn";
import styles from "./styles/Note.module.css";
import { NoteInput, deleteSingleNote, fetchNotes } from "./network/notes_api";
import AddNoteModal from "./components/AddNoteModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [show, setShow] = useState(false);

  //modal open/close
  const onClose = () => {
    setShow(false);
  };

  const onOpen = () => {
    setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await fetchNotes();
        setNotes(notes);
        console.log(notes);
      } catch (e) {
        alert(e);
      }
    };

    fetchData();
  }, [notes]);

  const deleteNote = async (note: NoteModel) => {
    try {
      await deleteSingleNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Navbar />

      <AddNoteBtn onClick={onOpen} />
      {show && (
        <AddNoteModal
          onClose={onClose}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            onClose();
          }}
        />
      )}
      {/* all notes */}
      <Container className={styles.cardWrapper}>
        <Row xs={1} md={2} lg={3} xl={4} className={"g-4"}>
          {notes.map((note) => (
            <Col>
              <Note note={note} key={note._id} onDeleteNote={deleteNote} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
