import { useRef, useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ onSignUp }) => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [bday, setBday] = useState("");
  const [gender, setGender] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/register", {
      username: user,
      password: pwd,
      gender: gender,
      birthday: bday,
    });
    if (result.data.error == "no") {
      alert("welcom new user!");
      const id_res = await axios.get(`http://localhost:8080/${user}/id`);
      const id = id_res.data.result[0]["id"];
      onSignUp(user, id);
      navigate("/");
    } else {
      alert("username taken");
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <br />
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
        <label htmlFor="birthday">Birthday:</label>
        <br />
        <input
          type="date"
          id="birthday"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setBday(e.target.value)}
          value={bday}
          required
        />
        <br />
        <label htmlFor="gender">Gender:</label>
        <br />
        <input
          type="text"
          id="gender"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <br />
        <button onClick={register}>Register</button>
      </form>
    </section>
  );
};

export default Register;
