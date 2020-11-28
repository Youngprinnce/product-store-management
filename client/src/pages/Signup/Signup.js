import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "./Signup.css"
import { signup } from '../../actions/signupActions'
import {useHistory} from "react-router-dom"

const Signup = ({match}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    const auth =useSelector(state=>state.auth) 
    const error = useSelector(state => state.error)
    const handleSignup = (e) => {
        e.preventDefault();
        const user = { email, password, username }
        dispatch(signup(user, history, match.url))
    }
    console.log(match.url)
    useEffect(() => {
        if (error.error.message) {
            setMessage(error.error.message)
        }
    },[error.error.message])

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSignup}>
                    <h3>Sign Up</h3>
                    <p>{ message && message}</p>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/signin">sign in?</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
