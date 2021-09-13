import { getDatabase, ref, set } from '@firebase/database';
import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const reducer = (state, action) => {
    switch(action.type) {
        case "questions": 
        action.value.forEach((questions) => {
            questions.options.forEach((option) => {
                option.checked = false;
            });
        });
            return action.value;
        
        case "answer": 
        const quwstions = _.cloneDeep(state);
        quwstions[action.questionID].options[action.optionIndex].checked = action.value;
            return quwstions;
        
        default: 
            return state;
    }
}

function Quiz() {
    const { videoID } = useParams();
    const { loading, error, questions } = useQuestions(videoID);
    const [currentQuestion, setCurrentQuestion ] = useState(0);

    const [qna, dispatch] = useReducer(reducer, null);
    const { currentUser } = useAuth();
    const history = useHistory();

    const { location } = history;
    const { state:{videoTitle} } = location;


    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions
        })
    }, [questions]);

    function handleAnswerChange(e, index) {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        })
    }

    // handle when user clicks the next button to get the next question
    function nextQuestion() {
        if(currentQuestion < (questions.length - 1) ) {
            setCurrentQuestion(prevState => prevState + 1 )
        }
    }
    // handle when user clicks prev button to get back to the previous question
    function prevQuestion() {
        if(currentQuestion > 0) {
            setCurrentQuestion(prevState => prevState - 1 )
        }
    }

    // sumit quiz
    async function submit() {
        const { uid } = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, { [videoID]: qna });

        history.push({
            pathname: `/result/${videoID}`,
            state: {
                qna,
            }
        });
    }

    // calculate percentage of progress
    const percetage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error!</div>}
            { !loading && !error && qna?.length > 0 && (
                <>
                    <h1>{ qna[currentQuestion].title }</h1>
                    <h4>Question can have multiple answers</h4>

                    <Answers
                        input
                        options={ qna[currentQuestion].options }
                        handleChange={ handleAnswerChange }
                    />
                    <ProgressBar 
                        next={nextQuestion} 
                        prev={prevQuestion} 
                        progress={percetage} 
                        submit={submit}
                    />
                    <MiniPlayer url={videoID} title={videoTitle} />
                </>
            )}
        </>
    )
}

export default Quiz;
