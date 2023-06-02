import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth-provider';
import { useQuestion } from '../hooks/question-provider';

import "./home.css"
import Header from '../components/header';

function Home() {
    const { signOut } = useAuth();
    const { getAllQuestions, questions, addQuestion } = useQuestion();
    
    const [addQuestionContent, setAddQuestionContent] = useState("");

    function handleSignOut() {
        signOut()
    }

    useEffect(() => {
      getAllQuestions();
    }, [getAllQuestions])

    async function handleAddQuestion() {
      await addQuestion({ content: addQuestionContent })
    }

  return (
    <div>
        <Header/>
        <div className='subreader'>
          <button onClick={handleSignOut}>Sign out</button>
          <a href='#'>Tela de avaliação</a>
          <a href='/criar-perguntas'>Criação de perguntas</a>
          <a href='/resultados'>Resultados</a>
        </div>
        <div className='background'>
          <img src='photo-background@2x.png'></img>
        </div>
    </div>
  );
}

export default Home;
