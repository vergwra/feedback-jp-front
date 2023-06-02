import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";
import { useAuth } from "./auth-provider";

interface IQuestion {
    id: string;
    content: string;
    created_at: Date;
    deleted_at: Date;
}

interface IAddQuestion {
    content: string;
}

interface QuestionContextData {
    questions: IQuestion[]
    getAllQuestions(): Promise<IQuestion[]>
    addQuestion(question: IAddQuestion): Promise<IQuestion[]>
}


const QuestionContext = createContext<QuestionContextData>({} as QuestionContextData);

interface IQuestionProvider {
    children: React.ReactNode;
}

export function QuestionProvider({ children }: IQuestionProvider) {
    const {token} = useAuth();
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    const getAllQuestions = useCallback(async () => {
        const response = await api.get("/quiz/question", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        const { questions } = response.data;

        setQuestions(questions);

        return questions;
    }, [token]) 
    
    const addQuestion = useCallback(async ({ content }: IAddQuestion) => {
        const authorization = "Bearer " + token;

        const data = {
            content
        }

        const header = {
            headers: { 'Authorization': authorization }
        }

        const response = await api.post("/quiz/question", data, header)
        const { question } = response.data;

        setQuestions([...questions, question ]);

        return questions;
    }, [questions, token])

    return (
        <QuestionContext.Provider value={ { getAllQuestions, questions, addQuestion } }>
            { children }
        </QuestionContext.Provider>
    );
}

export function useQuestion() {
    const questionContext = useContext(QuestionContext);

    if (!questionContext) {
        throw new Error("useAuth must be used within an QuestionProvider");
    }

    return questionContext;
}