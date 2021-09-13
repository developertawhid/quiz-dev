import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import classes from '../styles/MiniPlayer.module.css';

function MiniPlayer({ title, url }) {
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);
    const videoUrl = `https://www.youtube.com/watch?v=${url && url}`

    function toggleMiniPlayer() {
        const { current } = buttonRef;
        if(!status) {
            current.classList.remove(classes.floatingBtn);
            setStatus(true);
        }else {
            current.classList.add(classes.floatingBtn);
            setStatus(false);
        }
    }

    return (
        <div 
            className={`${classes.miniPlayer} ${classes.floatingBtn}`} 
            onClick={toggleMiniPlayer}
            ref={buttonRef}
        >
            <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={toggleMiniPlayer}> close </span>
            <ReactPlayer 
                className={classes.player}
                url={videoUrl} 
                width="300px"
                height="168px"
                playing={status} 
                controls
            />
            <p>{ title }</p>
        </div>
    )
}

export default MiniPlayer;
