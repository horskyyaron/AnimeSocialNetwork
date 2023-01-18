
import {useRef, useState, useEffect, useContext} from 'react';
import { Axios } from "axios";
import { Link } from 'react-router-dom';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [loginStatus, setLoginStatus] = useState("");

    const login = () => {
        Axios.post('http://localhost3001/login', {
            username: user,
            password: pwd,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.massage)
            } else {
                setLoginStatus(response.data[0].username)
            }
            console.log(response.data)
        });
    };

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd)
        setUser('')
        setPwd('')
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <section>
                    <h1> You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (

            <section>

                <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive">{errMsg}</p> 

                <h1>Sign in</h1>   

                <form onSubmit={handleSubmit}>

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
            </section>
            )}
            </>
    )
}

export default Login