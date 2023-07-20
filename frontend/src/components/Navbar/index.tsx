import React from "react";
import star from "../../images/star.png";
import { User } from "../../models/user";
import { Button, Container, Navbar as Nav } from "react-bootstrap";
import { LoginCredentials, logout } from "../../network/notes_api";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle } from "react-icons/fa";
import styles from "../../styles/Note.module.css";

interface NavBarProps {
  username?: string;
  loggedinUser?: User | null;
  onLogout?: any;
}

const Navbar = ({ username, loggedinUser, onLogout }: NavBarProps) => {
  const logoutUser = async () => {
    try {
      await logout();
      onLogout();
    } catch (e) {
      alert(e);
    }
  };

  const LoggedInView = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle
          id="custom"
          style={{ background: "none", border: "none" }}
        >
          <FaUserCircle fontSize={"30px"} color={"#403c38"} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Hi, {username}</Dropdown.Item>
          <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div
      style={{
        paddingTop: "30px",
        paddingBottom: "22px",
        paddingRight: "20px",
        paddingLeft: "40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img style={{ width: "150px" }} src={star} alt="star" />
      <LoggedInView />
    </div>
  );
};

export default Navbar;
