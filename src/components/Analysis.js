import React from 'react';
import Questions from './Questions';

function Analysis({ answers }) {
    return (
        <div style={{ margin: '2rem auto' }}>
            <h1>Question Analysis</h1>

            <Questions answers={answers} />
        </div>
    )
}

export default Analysis;
