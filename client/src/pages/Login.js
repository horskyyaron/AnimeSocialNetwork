import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  const errorMessage = "Username/Password incorrect";

  const login = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/login", {
      username: user,
      password: password,
    });
    if (result.data.result.length > 0) {
      const user_id = result.data.result[0]["id"];
      onLogin(user, user_id);
      setLoginStatus(true);
    } else {
      alert("wrong user name or password");
      // notify();
      // alert("wrong username/password");
      // setUser("");
      // setPassword("");
    }
  };

  const notify = () => {
    setUser("");
    setPassword("");
    toast(errorMessage);
  };

  return (
    <>
      {loginStatus ? (
        <section>
          <h1>You are logged in! Welcome back</h1>
          <br />
          <Link to="/">
            <p>Go to Home</p>
          </Link>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Sign in</h1>

          <form>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <br />
            <Link to="/">
              <button onClick={login}> Sign In</button>
            </Link>
          </form>
          <p>
            Need an Acount?
            <br />
            <span className="line">
              <Link to="/register">
                <a href="#">Sign Up</a>
              </Link>
            </span>
          </p>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default Login;
