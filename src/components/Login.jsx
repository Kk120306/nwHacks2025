import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/login', {email, password})
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

function Login(){
    const [email, setEmail] = userState('');
    const [password, setPassword] = userState('');
    function handleSubmit(event){
        event.preventDefault();
        
    }

    return(
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control'
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className='form-control'
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    )   
}

export default Login;