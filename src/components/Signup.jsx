import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            placeholder='Enter Username'
                            className='form-control'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <link to="/Login" className='btn btn-default border w-100 bg-light rounded-0'>Log In</link>
                </form>
            </div>
        </div>
    );
}