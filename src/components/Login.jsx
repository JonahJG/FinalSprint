import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //setting up all the data in empty arrays to store in. Also setting up error message handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  //fetching data to verify the user's email and password, then checking if they match
  const submitForm = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) =>
            user.email &&
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password &&
            user.password.toLowerCase() === password.toLowerCase()
        );
        // patching the data from "users" to "currentUser", to keep track of who is logged in, with error handling, and then redirect to profile page
        if (user) {
          localStorage.setItem("token", user.token);
          fetch("http://localhost:8000/currentUser", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(user),
          })
            .then((response) => response.json())
            .then((data) => {
              setLoggedInUser(data);
              navigate("/profile");
            })
            .catch((error) => console.log(error));
        } else {
          setErrorMessage("Invalid email or password");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    // login form
    <div id="signin">
      <p className="logintext">Login</p>
      <form onSubmit={submitForm}>
        <section className="email">
          <label htmlFor="email" className="emaillabel">
            Email:
          </label>
          <input
            type="email"
            id="emailinput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <section>
          <label className="passwordlabel" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="passwordinput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <button className="login" type="submit">
          Login
        </button>
      </form>
      <p>{errorMessage}</p>
      {/* sign up form button, navigates to sign up */}
      <p className="signup">
        Don't have an account?{" "}
        <a className="signuplink" onClick={navigateToSignUp}>
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default Login;
