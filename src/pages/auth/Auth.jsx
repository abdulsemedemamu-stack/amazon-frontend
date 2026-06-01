// src/pages/auth/Auth.jsx

import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { auth } from "../../utility/firebase";
import { DataContex } from "../../components/dataprovider/DataProvider";
import { Type } from "../../utility/ActionType";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { CircleLoader } from "react-spinners";

function Auth() {
  const navigate = useNavigate();
  const navStateData = useLocation();
  const [{ user }, dispatch] = useContext(DataContex);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // FIXED
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // SIGN IN
      if (e.target.name === "signin") {
        setLoading({ ...loading, signIn: true });

        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        setLoading({ ...loading, signIn: false });

        navigate(navStateData?.state?.redirect || "/ ");
      }

      // SIGN UP
      else {
        setLoading({ ...loading, signUp: true });

        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        setLoading({ ...loading, signUp: false });

        navigate(navStateData?.state?.redirect || "/");
      }
    } catch (err) {
      console.log(err);

      setError(err.message);

      setLoading({
        signIn: false,
        signUp: false,
      });
    }
  };

  return (
    <section className={classes.login}>
      {/* LOGO */}

      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>

      {/* FORM */}

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            name="signin"
            onClick={authHandler}
            className={classes.login_signinbutton}
          >
            {loading.signIn ? (
              <CircleLoader color="#000" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* ERROR MESSAGE */}

        {error && (
          <small style={{ color: "red", marginTop: "10px" }}>{error}</small>
        )}

        <p>
          By signing in you agree to Amazon clone conditions of use and sale.
        </p>

        {/* SIGN UP BUTTON */}

        <button
          type="button"
          name="signup"
          onClick={authHandler}
          className={classes.login_registeraccount}
        >
          {loading.signUp ? (
            <CircleLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
