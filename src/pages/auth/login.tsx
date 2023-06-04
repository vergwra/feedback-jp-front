import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth-provider';

import "./login.css"
import Header from '../../components/header';
import { useLoading } from '../../hooks/loading-provider';
import { Dna } from 'react-loader-spinner';

function Login() {
    const { isLoading, stopLoading, startLoading } = useLoading();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn } = useAuth();

    async function handleLogin() {
        try {
            startLoading();
            await signIn({
                email,
                password
            })
        }
        catch {
            setEmail("")
            setPassword("")
        }
        finally {
            stopLoading();
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
                    <input type='password' value={password} className='inputLogin' onChange={e=> setPassword(e.target.value)} placeholder="senha"></input>
                </div>
                <div  className='loginInput'>
                    <a href='#'>Esqueceu sua senha?</a>
                    <div>
                        {
                            isLoading ? <Dna/> : <button className='entrar' onClick={handleLogin}>Entrar</button>
                        }
                    </div>
                    
                </div>
            </div>
            <div>
            </div>
        </div>
        </>
    );
}

export default Login;
