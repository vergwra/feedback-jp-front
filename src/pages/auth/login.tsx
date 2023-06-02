import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth-provider';

import "./login.css"
import Header from '../../components/header';

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
        <>
        
            <Header></Header>
        <div className="middle">
            <div>
                <div className='backgroundLogin'>
                    <div className='loginTitle'>
                        <h1>Login</h1>
                        <p>Entre com seu e-mail e sua senha para acessar a plataforma.</p>
                    </div>
                    <input  onChange={e=> setEmail(e.target.value)} placeholder="email"></input>
                    <input onChange={e=> setPassword(e.target.value)} placeholder="senha"></input>
                    <div>
                        <a>Esqueceu sua senha?</a>
                        <button onClick={handleLogin}>login</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
