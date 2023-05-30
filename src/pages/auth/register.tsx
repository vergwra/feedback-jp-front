import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth-provider';

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signUp } = useAuth();

    async function handleLogin() {
        try {
            await signUp({
                email,
                name,
                password
            })
        }
        catch {
            setName("")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div>
            <input onChange={e=> setName(e.target.value)} placeholder="name"></input>
            <input onChange={e=> setEmail(e.target.value)} placeholder="email"></input>
            <input onChange={e=> setPassword(e.target.value)} placeholder="senha"></input>
            <button onClick={handleLogin}>register</button>
        </div>
    );
}

export default Register;
