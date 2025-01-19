import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import "./styles/Login.css"

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', { email, password })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary Login">
            <div className="p-3 bg-white w-25">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={handleInput}
                            value={values.email}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={handleInput}
                            value={values.password}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
