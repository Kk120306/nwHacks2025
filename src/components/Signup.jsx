import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/Signup.css"

function Signup() {
    const [values, setValues] = useState({
        username: '',
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
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios
                .post('http://localhost:8081/signup', values)
                .then((res) => {
                    navigate('/login');
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary Signup" >
            <div className="p-3 bg-white w-25">
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            className="form-control"
                            onChange={handleInput}
                            value={values.username}
                        />
                        {errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>
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
                        Sign up
                    </button>
                    <Link to="/Login" className="btn btn-default border w-100 bg-light rounded-0">
                        Log In
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
