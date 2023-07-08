import React, { useRef } from "react";
import "./SignUp.css";
import { auth } from "../Firebase";

export default function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const Register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const singIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      });
  };
  return (
    <div className="signUp">
      <form className="signUp__body">
        <h2>Sign In</h2>
        <input ref={emailRef} type="text" placeholder="Email Address" />
        <input ref={passwordRef} type="text" placeholder="Password" />
        <button onClick={singIn}>Sign In</button>
        <p>
          New to Netflix,{" "}
          <strong onClick={Register} style={{ cursor: "pointer" }}>
            Sign Up now
          </strong>
        </p>
      </form>
    </div>
  );
}
