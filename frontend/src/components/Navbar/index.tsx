import React from "react";
import star from "../../images/star.png";
import { User } from "../../models/user";
import { Container, Navbar as Nav } from "react-bootstrap";
import { LoginCredentials, logout } from "../../network/notes_api";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle } from "react-icons/fa";

interface NavBarProps {
  loggedinUser?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onSignup?: () => void;
}

const Navbar = ({ loggedinUser, onLogin, onLogout, onSignup }: NavBarProps) => {
  const logoutUser = async () => {
    try {
      await logout();
      // onLogout();
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
          <Dropdown.Item href="#/action-1">Hi, username</Dropdown.Item>
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
        paddingLeft: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div />
      <img
        style={{ width: "200px", paddingLeft: "26px" }}
        src={star}
        alt="star"
      />
      <LoggedInView />
    </div>
  );
};

export default Navbar;
