import {useRef, useState, useEffect, useContext} from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');


    const [loginStatus, setLoginStatus] = useState(false);

    const errorMessage = "Username/Password incorrect";
    
    const notifyOnFailure = () => {
        setUser('');
        setPwd('');
        toast(errorMessage);
    } 

    const login = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/login", {
            username: user,
            password: pwd,
        }).then((response) => {
            if(response.data.length > 0) {
                setLoginStatus(true);
                console.log(response.data);
                console.log(loginStatus);
            } else {
                notifyOnFailure();
            }
        });
    };

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

   
    return (
        <>   
          {loginStatus ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <Link to="/">
                    <p>Go to Home</p>
                </Link>
            </section>
          ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive">{errMsg}</p> 

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
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required 
                    />
                    <br />
                    <Link to="/" >
                        <button onClick={login}> Sign In</button>
                    </Link>
                    

                </form>
                <p>
                    Need an Acount?<br/>
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
    )
}

export default Login
