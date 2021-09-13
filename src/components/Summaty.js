import React, { useMemo } from 'react';
import successImage from '../assets/images/success.png';
import useFetch from '../hooks/useFatch';
import classes from '../styles/Summaty.module.css';

function Summaty({ score, noq }) {
    
    const getKeyword = useMemo(function () {
        const res = (score / (noq * 5)) * 100;
        if(res < 50) {
            return "failed"
        }else if(res < 100) {
            return 'very good'
        }else {
            return "excellent"
        }
    }, [score, noq]);

    
    const { loading, error, result } = useFetch(
        `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
        "GET",
        {
            Authorization: process.env.REACT_APP_PEXELS_API_KEY
        }
    );

    const image = result ? result?.photos[0].src.medium : successImage ;

    return (
        <div className={ classes.summary }>
            <div className={ classes.point }>
            <p className={ classes.score }>
                Your score is <br />
                {score} out of {noq * 5}
            </p>
            </div>

            <div className={ classes.badge }>
                {loading && "Loading your badhe..."}
                {error && "An error occured!"}
                {!error && !loading  && <img src={image} alt="Success" />}
            </div>
        </div>
    )
}

export default Summaty;
