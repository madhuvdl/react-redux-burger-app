import React, { Component } from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: true
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: true
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: true
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formValid: false,
        loader: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loader: true });
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            address: {
                city: 'Chennai',
                state: 'Tamil Nadu',
                country: 'India',
                zipCode: '600017'
            },
            name: 'Madhu',
            email: 'test@test.com',
            deliveryMethod: 'fastest'
        }
        // alert('continue');
        axios.post('/orders.json', orders)
            .then(response => {
                this.setState({ loader: false, purchasing: false });
                console.log(response)
            })
            .catch(error => this.setState({ loader: false }));

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        }

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;
        let isFormValid = true;
        for (let inputIdentifier in updateOrderForm) {
            isFormValid = updateOrderForm[inputIdentifier].valid && isFormValid;
        }
        console.log('isFormValid ', isFormValid);

        this.setState({orderForm: updateOrderForm, formValid: isFormValid});

    }

    render() {

        let orderFormElements = [];
        for(let key in this.state.orderForm) {
            orderFormElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {orderFormElements.map(element => (
                    <Input
                        key={element.id}
                        elementtype={element.config.elementType}
                        elementconfig={element.config.elementConfig}
                        value={element.value}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                ))}

                <Button btnType="Success" clicked={this.orderHandler}  disabled={!this.state.formValid}>ORDER</Button>
            </form>
        )
        if (this.state.loader) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;