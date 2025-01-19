import React, { useState } from 'react'; // Import useState
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const [errors, setErrors] = useState({})
    
    function handleSubmit(event) {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/home');
                }else {
                    alert("No record existed");
                }
        })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit} action ="" >
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={handleInput}
                        />
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={handleInput}
                        />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                    <link to="/signup" className='btn btn-default border w-100 bg-light rounded-0'>Create Account</link>
                </form>
            </div>
        </div>
    );
}

export default Login;
