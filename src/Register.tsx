import { useState } from "react";
import './App.css'

export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(`Register successful: ${data.token}`);
    } else {
        alert(`Register failed: ${data.message}`);
    }
    };

    return (
        
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username"  value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        
        <label htmlFor="passwd">Password</label>
        <input type="password" id="passwd" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        
        <button type='submit'>Register</button>
        </form>
        
    )
}