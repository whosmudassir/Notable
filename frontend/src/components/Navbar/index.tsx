import React from "react";
import star from "../../images/star.png";

const Navbar = () => {
  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "250px" }} src={star} alt="star" />
    </div>
  );
};

export default Navbar;
