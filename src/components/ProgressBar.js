import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import classes from '../styles/ProgressBar.module.css';

function ProgressBar({ next, submit, prev, progress }) {
    const [tooltip, setTooltip] = useState(false);
    const tooltipRef = useRef();

    function toggleTooltip() {
        const { current } = tooltipRef;
        if(tooltip) {
            setTooltip(false);
            current.style.display = "none";
        }else {
            setTooltip(true);
            current.style.left = `calc(${progress}% - 65px)`;
            current.style.display = "block";
        }
    }


    return (
        <div className={ classes.progressBar }>
            <div className={ classes.backButton } onClick={prev}>
                <span className="material-icons-outlined"> arrow_back </span>
            </div>
            <div className={ classes.rangeArea }>
                <div className={ classes.tooltip } ref={tooltipRef}>{ progress }% Complete!</div>
                <div className={ classes.rangeBody }>
                    <div 
                        className={ classes.progress } 
                        style={{ width: `${progress}%` }}
                        onMouseOver={toggleTooltip}
                        onMouseOut={toggleTooltip}
                    ></div>
                </div>
            </div>
            <Button className={ classes.next } onClick={progress === 100 ? submit : next}>
                <span>{ progress === 100 ? "Submit Quiz" : "Next Question" }</span>
                <span className="material-icons-outlined"> arrow_forward </span>
            </Button>
        </div>
    )
}

export default ProgressBar;
