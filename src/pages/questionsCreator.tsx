import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth-provider';
import { useQuestion } from '../hooks/question-provider';

import "./questionCreator.css"
import Header from '../components/header';

function QuestionCreator() {
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
    <div className='main'>
      <Header></Header>
      <div className='subreader'>
        <a href='/'>{'<'}</a>
        <p>Criação de perguntas</p>
      </div>
  
      <div className='middle'>
          <h2>Adicione sua pergunta:</h2>
        <div className='questionAdd'>
          <input className='input' onChange={(e) => setAddQuestionContent(e.target.value)} placeholder='escreva a questão'></input>
          <button className='button1' onClick={handleAddQuestion}>Adicionar</button>
        </div>
        <h2>Perguntas:</h2>
        <div >
          {
            questions?.map((question) => {
              return(
                <div className='question'>
                  <p id={question.id}>{question.content}</p>
                  <button className='button2'>x</button>
                </div>
                )
              })
              
            }
      </div>
        </div>
    </div>
  );
}

export default QuestionCreator;
