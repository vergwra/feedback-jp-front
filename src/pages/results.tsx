import React, { useEffect, useState } from 'react';
import "./results.css"
import Header from '../components/header';


function Results() {
    return (
        <div className='main'>
        <Header></Header>
        <div className='subreader'>
            <a href='/'>{'<'}</a>
            <p>Resultados</p>
        </div>
        </div>
    
    );
}
