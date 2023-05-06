import React, { useEffect, useState } from "react";

import "./App.css";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
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
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
