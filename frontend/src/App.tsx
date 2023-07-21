import React, { useEffect, useState } from "react";
import "./App.css";
import { getLoggedInUser } from "./network/notes_api";
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
        // alert(error);
      }
    }
    fetchLoggedinUser();
  }, []);

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
