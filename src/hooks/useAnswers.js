import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

function useAnswers(videoID) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);
    
    useEffect(() => {
        async function fetchAnswers() {
            // database related words 
            const db = getDatabase();
            const answerRef = ref(db, `answers/${videoID}/questions`);
            const answerQurey = query(answerRef, orderByKey());

            try {
                setError(false);
                setLoading(true);

                // request firebase database
                const snapshot = await get(answerQurey);
                setLoading(false);

                if(snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        const answers = Object.values(snapshot.val());
                        return [ ...prevAnswers, ...answers ]
                    })
                }

            } catch(err) {
                // Respons Error...
                setLoading(false);
                setError(true);
                console.log(err)
            }
        }

        fetchAnswers();
        
    }, [videoID]);

    return {
        loading,
        error,
        answers
    }
}

export default useAnswers;
