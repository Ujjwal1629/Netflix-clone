import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../Firebase";
import PlanScreen from "./PlanScreen";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const Navigate = useNavigate();
  const user = useSelector(selectUser);
  return (
    <div className="profile">
      <div className="logo">
        <img
          onClick={() => {
            Navigate("/");
          }}
          className="nav_logo"
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt=""
        />
      </div>
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJY8ri89jq-__7Lt6F8AHtVw1RLdRUIiWtYa6mnb6SUA&s"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <p>Plans</p>
            <PlanScreen />
            <div className="profileScreen__plans">
              <button
                onClick={() => {
                  auth.signOut();
                }}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
