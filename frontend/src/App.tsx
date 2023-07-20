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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import NoPageFound from "./pages/NoPageFound";

function App() {
  const [loggedinUser, setLoggedinUser] = useState<any>(null);

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

  console.log("loggedinUser :: : ", loggedinUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <NotesPage
              loggedinUser={loggedinUser}
              setLoggedinUser={setLoggedinUser}
            />
          }
        />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
