import React from "react";
import star from "../../images/star.png";

const Navbar = () => {
  return (
    <div
      style={{
        paddingTop: "30px",
        paddingBottom: "22px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "250px" }} src={star} alt="star" />
    </div>
  );
};

export default Navbar;
