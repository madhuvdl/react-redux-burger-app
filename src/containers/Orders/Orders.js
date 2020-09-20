import React, { Component } from 'react';

import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
class Orders extends Component {

    state = {
        orders: [],
        loader: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                // console.log(response.data);
                const fetchedOrders = [];
                for(let key in response.data) {
                    // console.log('response.data[key] ', response.data[key]);
                    // console.log('[key] ', key);
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({loader: false, orders: fetchedOrders});
            })
            .catch(err => this.setState({loader: false}))
    }

    render() {
        return (
            <div>
                { this.state.Orders.map(order => (
                    <Order
                     key={order.id}
                     ingredients={order.ingredients}
                     price={order.price} />
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);