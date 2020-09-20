import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    console.log('props ', props);
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputOptions = null;
    if(props && props.elementConfig && props.elementConfig.options) {
        console.log('inputOptions in');
        inputOptions = props.elementConfig.options.map(option => <option value={option.value}>{option.displayValue}</option>)
    }

    console.log('inputOptions ', inputOptions);

    switch (props.elementType) {
        case('input') :
        inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementconfig}
                                value={props.value}
                                onChange={props.changed} />
            break;
        case('textarea'):
        inputElement = <textarea
                                className={inputClasses.join(' ')}
                                {...props.elementconfig}
                                value={props.value}
                                onChange={props.changed} />
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {inputOptions}
                </select>
            );
                break;      
        default :
        inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementconfig}
                                value={props.value}
                                onChange={props.changed} />
}

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;