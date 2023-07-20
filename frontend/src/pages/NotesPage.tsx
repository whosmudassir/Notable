import React from "react";
import LoggedInView from "../components/LoggedInView";
import LoggedOutView from "../components/LoggedOutView";

const NotesPage = ({ loggedinUser, setLoggedinUser }: any) => {
  return (
    <>
      {loggedinUser ? (
        <LoggedInView
          username={loggedinUser?.username}
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
};

export default NotesPage;
