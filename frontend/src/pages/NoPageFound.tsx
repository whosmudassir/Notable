import React from "react";
import styles from "../styles/Note.module.css";

const NoPageFound = () => {
  return (
    <div
      className={styles.homePage}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p className="styles.mainText">No Page Found!</p>
    </div>
  );
};

export default NoPageFound;
