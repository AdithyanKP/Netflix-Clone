import React, { useState, useEffect } from "react";
import "./NavBar.css";
function NavBar() {
  const [show, handleshow] = useState(false);
  //scroll//
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true);
      } else {
        handleshow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`navbar ${show && "navbarscroll"}`}>
      {/* <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png
"
        alt="Netflix logo"
      /> */}
      <h1 style={{ color: "red", fontFamily: "sans-serif" }}>ADIFLIX</h1>
      <img
        className="avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="avatar"
      />
    </div>
  );
}

export default NavBar;
