import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/home');
        })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit} action="">
                    <div className='mb-3'>
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            name="username"
                            placeholder='Enter Username'
                            className='form-control'
                            onChange={handleInput}
                        />
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
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
                            name="password"
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={handleInput}
                        />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <link to="/Login" className='btn btn-default border w-100 bg-light rounded-0'>Log In</link>
                </form>
            </div>
        </div>
    );
}

export default Signup;