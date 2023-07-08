import React, { useState } from "react";
import "./Login.css";
import SignUp from "./SignUp";

export default function Login() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="login">
      <div className="login__background">
        <img
          className="login__logo"
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt=""
        />
        <button onClick={() => setSignIn(true)} className="login__button">
          Sign In
        </button>
        <div className="login__gradient" />
      </div>
      <div className="login__body">
        {signIn ? (
          <SignUp />
        ) : (
          <>
            <h1>Unlimited Films, TV Programmes and more.</h1>
            <p>Watch Anywhere, Cancel Anytime...</p>
            <span>
              Ready to watch? Enter your email to create or restart your
              membership.
            </span>
            <form className="login__form" action="">
              <input
                className="loginForm__input"
                type="text"
                placeholder="Email Address"
              />
              <button
                onClick={() => setSignIn(true)}
                className="loginForm__button"
              >
                Get Started
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
