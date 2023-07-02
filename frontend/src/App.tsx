import React, { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Navbar from "./components/Navbar";
import AddNoteBtn from "./components/AddNoteBtn";
import styles from "./styles/Note.module.css";
import { NoteInput, deleteSingleNote, fetchNotes } from "./network/notes_api";
import AddEditNoteModal from "./components/AddEditNoteModal";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [show, setShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNotesError, setShowNotesError] = useState(false);

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
        setShowNotesError(false);
        setLoading(true);
        const notes = await fetchNotes();
        setNotes(notes);
      } catch (e) {
        setShowNotesError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      {/* sign up modal */}

      {false && (
        <SignupModal onClose={() => null} onSignupSuccess={() => null} />
      )}



   {false && (   <LoginModal onClose={() => null} onLoginSuccess={() => null} />)}

      {/* add note modal */}
      {show && (
        <AddEditNoteModal
          onClose={onClose}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            onClose();
          }}
        />
      )}

      {/* edit note modal */}
      {noteToEdit && (
        <AddEditNoteModal
          onClose={() => setNoteToEdit(null)}
          noteToEdit={noteToEdit}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}

      {/* all notes */}
      <Container className={styles.cardWrapper}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" />
          </div>
        ) : showNotesError ? (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Please refresh the page</p>
          </Alert>
        ) : (
          <>
            {notes.length > 0 ? (
              <Row xs={1} md={2} lg={3} xl={4} className={"g-4"}>
                {notes.map((note) => (
                  <Col>
                    <Note
                      note={note}
                      key={note._id}
                      onDeleteNote={deleteNote}
                      onEditNote={setNoteToEdit}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p> No Notes Found</p>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
