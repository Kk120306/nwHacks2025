import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

function App() {
    return (
        <Router>
            <Routes>
                {/* Login Route */}
                <Route path="/login" element={<Login />} />
                
                {/* Signup Route */}
                <Route path="/signup" element={<Signup />} />
                
                {/* Home Route */}
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
