import React, { useCallback, useEffect, useState } from 'react';
import { useQuestion } from '../hooks/question-provider';
import api from '../services/api';
import { RadialChart } from 'react-vis';
import "./results.css"

interface ICurrentQuestion {
    id: string;
    content: string;
}

interface IResult {
    question: string,
    bad: number,
    medium: number,
    good:  number
}

function Results() {
    const [results, setResults] = useState<IResult[]>([]);

    
    const getResults = useCallback(async () => {
        const response = await api.get("/quiz/response");
        setResults(response.data.results)
        console.log(response.data as IResult[])
    }, [])
    
    useEffect(() => {
        getResults();
    }, [getResults])

    return (
        <div>
            {
                results?.map(r => {
                    return (
                    
                        <div>
                            <h1>{r.question}</h1>
                            <RadialChart width={300} showLabels={true} labelsAboveChildren={true}  height={300} data={[
                                {
                                    angle: r.bad,
                                    radius: 1,
                                    label: `RUIM: ${r.bad}`,
                                    style: {
                                        stroke: "red",
                                        fill: 'red'
                                    }
                                },
                                {
                                    angle: r.medium,
                                    radius: 1,
                                    label: `MEDIO: ${r.medium}`,
                                    style: {
                                        stroke: "yellow",
                                        fill: 'yellow'
                                    }
                                },
                                {
                                    angle: r.good,
                                    radius: 1,
                                    label: `BOM: ${r.bad}`,
                                    style: {
                                        stroke: "green",
                                        fill: 'green'
                                    }
                                },
                        ]}/>
                        </div>
                    )       
                })
            }

        </div>
        
    )
}

export default Results;
