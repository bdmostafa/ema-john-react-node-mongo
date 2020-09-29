import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initLoginFramework, handleGoogleSignIn, handleSignOut, handleFBSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false
    });

    // Destructuring user state
    const { isSignedIn, name, email, password, photoURL } = user;

    // Initialize firebase/login framework
    initLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        // Redirect when signed in
        if (redirect) history.replace(from);
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFBSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleSubmit = (e) => {
        // console.log(user.email, user.password);

        // For new user
        if (newUser && email && password) {
            createUserWithEmailAndPassword(name, email, password)
            .then(res => {
                handleResponse(res, true);
            })
        }

        // For old users
        if (!newUser && email && password) {
            signInWithEmailAndPassword(email, password)
            .then(res => {
                handleResponse(res, true);
            })
        }
        e.preventDefault();
    }

    // const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // }

    const handleBlur = (e) => {
        // debugger;
        let isFieldValid = true;

        if (e.target.name === 'email') {
            // isFieldValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value)
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            // console.log(isFieldValid);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6
            const hasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && hasNumber;
        }

        // Update user state
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }

    }

    return (
        <div style={{ textAlign: "center" }}>
            {
                isSignedIn
                    ? <button onClick={signOut}> Sign Out </button>
                    : <button onClick={googleSignIn}> Sign In </button>
            }
            <button onClick={fbSignIn}> FB Sign In </button>
            {
                isSignedIn
                && <div>
                    <p>Congratulations, {name}!</p>
                    <img src={photoURL} alt="" />
                    <p>You have signed in successfully.</p>
                    <p>Your email: {email}</p>
                </div>
            }

            <h1>Our Athentication</h1>
            <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="newUser" />
            <label htmlFor="newUser">New User Sign Up</label>

            <form action="" onSubmit={handleSubmit}>
                {
                    newUser
                    && <>
                        <input onBlur={handleBlur} type="text" name="name" placeholder="Your name"></input><br />
                    </>
                }

                <input onBlur={handleBlur} type="text" name="email" placeholder="Your email addess" required></input><br />
                <input onBlur={handleBlur} type="password" name="password" placeholder="Your password" required></input><br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />

                <p style={{ color: 'red' }}> {user.error} </p>

                {
                    user.success
                    && <p style={{ color: 'green' }}> User  {newUser ? 'created' : 'logged in'} successfully. </p>
                }
            </form>
        </div>
    );
}

export default Login;
