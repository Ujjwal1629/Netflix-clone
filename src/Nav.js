import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav_contents">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="nav_logo"
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt=""
        />
        <div className="nav__items">
          <p
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
          <p>Series</p>
          <p>Films</p>
          <p>My list</p>
          <p>Trending</p>
        </div>
      </div>
      {/* <div className="icon">
        <BsSearch />
        <IoMdNotificationsOutline />
      </div> */}
      <img
        onClick={() => {
          navigate("/profile");
        }}
        className="nav_avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJY8ri89jq-__7Lt6F8AHtVw1RLdRUIiWtYa6mnb6SUA&s"
        alt=""
      />
    </div>
  );
}
