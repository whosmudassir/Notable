import React, { useEffect, useState } from "react";

import "./App.css";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

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
    <div>
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;
