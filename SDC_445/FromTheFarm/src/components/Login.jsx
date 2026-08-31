/*
=========================================================
SDC445 - Interface Design
From the Farm

Authors:
- Jade Powell
- Holly Hebert
- Patrick Gonzalez

Description:
Login page for the From the Farm project. The email and
password fields are controlled React components using
useState and onChange. Basic validation provides visible
feedback for the text-field assignment.
=========================================================
*/

import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedEmail = email.trim();

    if (cleanedEmail === "" || password === "") {
      setLoginMessage("Please enter both an email address and password.");
      return;
    }

    if (!cleanedEmail.includes("@") || !cleanedEmail.includes(".")) {
      setLoginMessage("Please enter a valid email address.");
      return;
    }

    setLoginMessage(`Login information received for ${cleanedEmail}.`);
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-heading">
          <p className="login-eyebrow">Welcome back</p>
          <h2>Log in to From the Farm</h2>
          <p>
            Sign in to save local listings, manage your profile, and connect
            with nearby farms and producers.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <button type="submit" className="login-submit">
            Log In
          </button>
        </form>

        {loginMessage && (
          <p className="login-message" aria-live="polite">
            {loginMessage}
          </p>
        )}

        <p className="login-note">
          Demo interface only — no account information is stored or sent.
        </p>
      </div>
    </section>
  );
}

export default Login;
