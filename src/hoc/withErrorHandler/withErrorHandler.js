import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxHoc/AuxHoc';

const withErrorHandler = (WrappedContainer, axios) => {

    return class extends Component {
        state = {
            error: null
        };

        componentWillMount () {
            console.log('CAME---');
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log('Error', error);
                this.setState({erro: error});
            })
        }

        componentWillUnmount () {
            console.log('Un Mount ', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error: null})
        }

        render() {
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedContainer {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;