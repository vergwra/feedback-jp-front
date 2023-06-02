import React, { useCallback, useEffect, useState } from 'react';
import { useQuestion } from '../hooks/question-provider';
import api from '../services/api';
import { RadialChart } from 'react-vis';
import "./results.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


import { Carousel } from "react-responsive-carousel"
import Header from '../components/header';

interface ICurrentQuestion {
    id: string;
    content: string;
}

interface IResult {
    question: string,
    bad: number,
    medium: number,
    good:  number
    obs: string[]
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
        <>
            <Header></Header>
            <div className='subreader'>
                <a href='/'>{'<'}</a>
                <p>Resultados</p>
            </div>
            <div className='container'>

                <Carousel className='carousel'>
                    {
                        results?.map(r => {
                            return (
                                        <div className='result'>
                                            <div>
                                                <h1>{r.question}</h1>  
                                            </div>
                                            <div className='result-container'>
                                                {
                                                    r.good + r.bad + r.medium != 0 ? (
                                                        <>
                                                            <RadialChart width={300} height={300} data={[
                                                                {
                                                                    angle: r.bad,
                                                                    radius: 1,
                                                                    label: `RUIM: ${r.bad}`,
                                                                    style: {
                                                                        stroke: "#E71919",
                                                                        fill: '#E71919'
                                                                    }
                                                                },
                                                                {
                                                                    angle: r.medium,
                                                                    radius: 1,
                                                                    label: `MEDIO: ${r.medium}`,
                                                                    style: {
                                                                        stroke: "#DBDE30",
                                                                        fill: '#DBDE30'
                                                                    }
                                                                },
                                                                {
                                                                    angle: r.good,
                                                                    radius: 1,
                                                                    label: `BOM: ${r.bad}`,
                                                                    style: {
                                                                        stroke: "#2CDA28",
                                                                        fill: '#2CDA28'
                                                                    }
                                                                },
                                                            ]}/>
                                                            <ul>
                                                                {
                                                                    r.obs.map((o) => {
                                                                        return (
                                                                            <li>{o}</li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <div>
                                                            Ainda nao possui resultados
                                                        </div> 
                                                    )
                                                }
                                            </div>
                                        </div>
                                    
                                        
                            )       
                        })
                    }
                </Carousel>
            </div>
        </>
        
    )
}

export default Results;
