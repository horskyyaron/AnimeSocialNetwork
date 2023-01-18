import {useRef, useState, useEffect} from "react";
import React from 'react'
import { Link } from 'react-router-dom';
import Axios from "axios";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [bday, setBday] = useState('');
    const [gender, setGender] = useState('');
    const [pwd, setPwd] = useState('');
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const register = () => {
        console.log("inside register function")
        Axios.post("http://localhost:3001/register", {
            username: user,
            password: pwd,
            gender: gender,
            birthday: bday
        }).then((response) => {
            console.log(response)
        });
        console.log("after register");
    };

    useEffect(() => {
       userRef.current.focus(); 
    }, [])

    useEffect(() => {
        setErrMsg('')
     }, [user, pwd])

     function checkPassword(form) {
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;

        if (password != confirm_password) {
          alert("Error! Password did not match.");
          return false;
        } else {
          alert("Password Match. Congratulations!");
          return true;
        }
      }

  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" :
        "offscreen"} aria-live="assertive">{errMsg}</p>
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
  )
}

export default Register