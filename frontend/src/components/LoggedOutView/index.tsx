import React from "react";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import star from "../../images/star.png";
import Note from "../Note";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import styles from "../../styles/Note.module.css";
import { BsFillPencilFill } from "react-icons/bs";

const LoggedOutView = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          height: "100vh",
        }}
      >
        {false && (
          <SignupModal onClose={() => null} onSignupSuccess={() => null} />
        )}
        {false && (
          <LoginModal onClose={() => null} onLoginSuccess={() => null} />
        )}
        <div
          style={{
            paddingTop: "50px",
            paddingBottom: "12px",
          }}
        >
          <img style={{ width: "250px" }} src={star} alt="star" />
        </div>
        <Container className={styles.demoCardWrapper}>
          <BsFillPencilFill
            fontSize={"24px"}
            style={{
              color: "#63afde",
              marginBottom: "16px",
              marginRight: "14px",
            }}
          />{" "}
          <p className={styles.mainText}>Note taking made easy</p>{" "}
        </Container>
        <Button>Sign Up</Button> <Button>Log in</Button>
      </div>
      <div className={styles.footerText}>
        A{" "}
        <a
          href={"https://github.com/whosmudassir/mern-app-tutorial"}
          target="_blank"
        >
          Project
        </a>{" "}
        by{" "}
        <a href="https://whosmudassir.vercel.app/" target="_blank">
          Mudassir Khan
        </a>
      </div>
    </>
  );
};

export default LoggedOutView;
