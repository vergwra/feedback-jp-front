import React, { useCallback, useEffect, useState } from 'react';
import { useQuestion } from '../hooks/question-provider';
import api from '../services/api';
import "./questionario.css"

interface ICurrentQuestion {
    id: string;
    content: string;
}

interface IQuestionResponse {
    question_id: string;
    note: number,
    obs: string
}

function Questionario() {
    const { getAllQuestions, questions } = useQuestion();
    const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>({} as ICurrentQuestion);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentResponses, setCurrentResponses] = useState<IQuestionResponse[]>([]);
    const [note, setNote] = useState(-1);
    const [obs, setObs] = useState("");
    const [finished, setFinished] = useState(false);
    const [active, setActive] = useState(-1);

    async function startQuestionario() {
        const _questions = await getAllQuestions();
        setCurrentQuestion(_questions[0])
        setCurrentResponses([])
        setCurrentIndex(0)

        setFinished(false);
    }

    const responseQuestionario = useCallback(async () => {
        console.log({
            question_id: currentQuestion.id,
            note,
            obs: obs
        })
        await api.post("/quiz/response", {
            responses: [...currentResponses, {
                question_id: currentQuestion.id,
                note,
                obs: obs
            }]
        })
    }, [currentQuestion.id, currentResponses, note, obs])

    const responseCurrentQuestion = useCallback(() => {
        setCurrentResponses([...currentResponses, {
            question_id: currentQuestion.id,
            note,
            obs: obs
        }])

        setObs("")
        setNote(-1)
    }, [currentQuestion.id, currentResponses, note, obs])

    const handleNextQuestion = useCallback(async () => {
        if (note === -1) {
            return;
        }

        setCurrentIndex(currentIndex + 1)
        if (currentIndex > questions.length) {
            return;
        }

        responseCurrentQuestion();
        
        if (currentIndex + 1 >= questions.length) {
            //mandar resposta
            setFinished(true);
            await responseQuestionario();

            console.log("CABOOOOOOOOOOOOOOOo")

            setCurrentResponses([])
            setCurrentIndex(0)
            setCurrentQuestion(questions[0])

            return;
        }
        
        setCurrentQuestion({
            id: questions[currentIndex + 1].id,
            content: questions[currentIndex + 1].content
        })
    }, [currentIndex, questions, responseCurrentQuestion, responseQuestionario])

    function setNoteToTree() {
        setNote(3)
        setActive(0)
    }
    function setNoteToTwo(){
        setNote(2)
        setActive(1)
    }

    function setNoteToOne(){
        setNote(1)
        setActive(2)
    }
    if (finished) {
        return (
            <div className='middle'>
                <div className='backgroundQuestion2'>
                        <h1>Obrigado</h1>
                        <button onClick={startQuestionario}>Iniciar outra avaliação</button>
                </div>
            </div>
        )
    }
    else {
        return (
            questions.length > 0 ? (
                <div className='middle'>
                    <div className='backgroundQuestion'>
                    <div className='middleQuestion'>
                            <h1 className='title'>{currentQuestion?.content}</h1>
                            <div className='buttons'>
                                    <button className={`${note === 3 ? "active-button" : "unactive-button"}`} onClick={(setNoteToTree)}>
                                        <img src='happy.png' ></img>
                                    </button>
                                <button className={`${note === 2 ? "active-button" : "unactive-button"}`} onClick={setNoteToTwo}>
                                    <img src='satisfied.png'></img>
                                </button>
                                <button className={`${note === 1 ? "active-button" : "unactive-button"}`} onClick={setNoteToOne}>
                                <img src='sad.png'></img>
                                </button>
                            </div>
                            <input value={obs} onChange={e => setObs(e.target.value)} placeholder='observacao'></input>
                            <div className='footer'>
                                <p>{`${currentIndex + 1}/${questions.length}`}</p>
                                <button className='buttonNext' onClick={handleNextQuestion}>{currentIndex + 1 === questions.length ? "Finalizar" : "Proxima"}</button>
                            </div>
                        </div>    
                    </div>
                </div>
            ) : (
                <div className='middle'>
                    <div className='backgroundQuestion2'>
                        <h1>Avaliação do serviço médico</h1>
                        <button onClick={startQuestionario}>Iniciar</button>
                    </div>
                </div>
            )
        )
    }
}

export default Questionario;
