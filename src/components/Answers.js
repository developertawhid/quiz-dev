import React, { Fragment } from 'react';
import classes from '../styles/Answers.module.css';
import CheckBix from './CheckBox';

function Answers({ handleChange, options=[], input }) {
    
    return (
        <div className={ classes.answers }>
            {
                options?.map((option, index) => (
                    <Fragment key={index}>
                        {input ? (
                            <CheckBix
                                className={ classes.answer } 
                                text={ option.title } 
                                value={ index }
                                checked={ option.checked }
                                onChange={(e) => handleChange(e, index) }
                            />
                        ) : (
                            <CheckBix
                            className={`${classes.answer} ${
                                option.correct
                                    ? classes.correct
                                    : option.checked
                                    ? classes.wrong 
                                    : null
                            }`} 
                            text={ option.title } 
                            defaultChecked={ option?.checked }
                        />
                        )}
                    </Fragment>
                ))
            }
        </div>
    )
}

export default Answers;
