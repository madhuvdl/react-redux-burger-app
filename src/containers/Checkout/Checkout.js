import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    componentWillMount() {
        // console.log('props... ', this.props);
        // console.log('this.props.location.search ', this.props.location.search);
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param in query.entries()) {
        //     if (param[1] === 'price') {
        //         console.log('Came---');
        //         price = param[1];
        //     } else {
        //         console.log('Came--- 111');
        //         ingredients[param[0]] = +param[1];
        //     }
        // }
        // console.log('ingredients ', ingredients);
        // this.setState({ingredients: ingredients, totalPrice: price});

        // var search = this.props.location.search.substring(1);
        // let ingredients = JSON.parse(
        //     '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'
        //     )

        // this.setState({ingredients: ingredients, totalPrice: +ingredients.price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} component={ContactData} />
                {/* <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} /> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);