import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth-provider';

import "./login.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn } = useAuth();

    async function handleLogin() {
        try {
            await signIn({
                email,
                password
            })
        }
        catch {
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="mainContainer">
            <input  onChange={e=> setEmail(e.target.value)} placeholder="email"></input>
            <input onChange={e=> setPassword(e.target.value)} placeholder="senha"></input>
            <button onClick={handleLogin}>login</button>
        </div>
    );
}

export default Login;
