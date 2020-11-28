import React, { useEffect, useState } from 'react'
import "./Signin.css"
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/signinActions';
import {useDispatch, useSelector} from "react-redux"
import getParams from '../../helpers/getParams';

const Signin = ({location}) => {
    const params = getParams(location.search);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const error = useSelector(state => state.error)

    const handleLogin = (e) => {
        e.preventDefault();
        const user = { email, password }
        dispatch(login(user))
    }

    useEffect(() => {
        if (location.search !== "") {
            if (params.success) {
                setMessage("Registration Succesful, Please login")
            }
        } else {
            setMessage("")
        }
    }, [params, location.search])

    useEffect(() => {
        if (error.error.message) {
            setMessage(error.error.message)
        }
    }, [error.error.message])

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleLogin}>
                    <h3>Sign In</h3>
                    <p>{message && message}</p>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signin
