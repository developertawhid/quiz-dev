import _ from 'lodash';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summaty from '../Summaty';

function Result() {
    const { videoID } = useParams();
    const { location, push } = useHistory();
    const qna = location?.state?.qna;


    const { loading, error, answers } = useAnswers(videoID);
    
    if( !qna ) {
        push('/');
        return <div>Lodaing...</div>
    }

    function calculater() {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [];
            let checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if(option.correct) correctIndexes.push(index2);
                if(qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                };
            });

            if(_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }
        });

        return score;
    }

    return (
        <>
            { loading && <div>Loading...</div>}
            { error && <div>Loading...</div>}
            { !error && !loading && answers.length > 0 && (
                <>
                    <Summaty score={calculater()} noq={answers?.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    )
}

export default Result;
