import React, { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Navbar from "./components/Navbar";
import AddNoteBtn from "./components/AddNoteBtn";
import styles from "./styles/Note.module.css";
import {
  NoteInput,
  deleteSingleNote,
  fetchNotes,
  getLoggedInUser,
} from "./network/notes_api";
import AddEditNoteModal from "./components/AddEditNoteModal";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import LoggedInView from "./components/LoggedInView";
import LoggedOutView from "./components/LoggedOutView";

function App() {
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    async function fetchLoggedinUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedinUser(user);
      } catch (error) {
        alert(error);
      }
    }
    fetchLoggedinUser();
  }, []);

  return (
    <>
      {loggedinUser ? (
        <LoggedInView
          loggedinUser={loggedinUser}
          onLogout={() => {
            setLoggedinUser(null);
          }}
        />
      ) : (
        <LoggedOutView setLoggedinUser={setLoggedinUser} />
      )}
    </>
  );
}

export default App;
