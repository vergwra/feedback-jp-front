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
        <div className="middleLogin">
            <div className='backgroundLogin'>
                <div className='loginTitle'>
                    <h1 className='fontTitle'>Login</h1>
                    <p>Entre com seu e-mail e sua senha para acessar a plataforma.</p>
                </div>
                <div className='loginInput'>
                    <p>Email:</p>
                    <input value={email} className='inputLogin' onChange={e=> setEmail(e.target.value)} placeholder="email"></input>
                </div>
                <div className='loginInput'>
                    <p>Senha:</p>
                    <input value={password} className='inputLogin' onChange={e=> setPassword(e.target.value)} placeholder="senha"></input>
                </div>
                <div  className='loginInput'>
                    <a>Esqueceu sua senha?</a>
                    <button className='entrar' onClick={handleLogin}>Entrar</button>
                </div>
            </div>
            <div>
            </div>
        </div>
        </>
    );
}

export default Login;
