import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

function useQuestions(videoID) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        async function fetchQuestions() {
            // database related words 
            const db = getDatabase();
            const quizRef = ref(db, `quiz/${videoID}/questions`);
            const quizQurey = query(quizRef, orderByKey());

            try {
                setError(false);
                setLoading(true);

                // request firebase database
                const snapshot = await get(quizQurey);
                setLoading(false);

                if(snapshot.exists()) {
                    setQuestions((prevQuestions) => {
                        const questions = Object.values(snapshot.val());
                        return [ ...prevQuestions, ...questions ]
                    })
                }

            } catch(err) {
                // Respons Error...
                setLoading(false);
                setError(true);
                console.log(err)
            }
        }

        fetchQuestions();
    }, [videoID]);

    return {
        loading,
        error,
        questions
    }
}

export default useQuestions;
