import React from 'react';

import Aux from '../../../hoc/AuxHoc/AuxHoc';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = props.ingredients;
    const ingredientsList = Object.keys(ingredients)
        .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}</li>
        });
    return(
        <Aux>
            <h2>Your Order</h2>
            <p>A delecious burger with the following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkoout?</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;