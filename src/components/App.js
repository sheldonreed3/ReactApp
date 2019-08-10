import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';

import DefaultRfi from '../containers/rfiForm';
import MultiStepRfi from "../containers/twoStep";

import store from '../store';

class Rfi extends Component {
    render() {
        const {type, filter} = this.props;
        let form;

        switch (type.toLowerCase()) {
            case 'sbucks':
                break;
            case 'twostep':
            case 'multistep':
                form = <MultiStepRfi filter={filter} />;
                break;
            default:
                form = <DefaultRfi filter={filter} />;
        }

        return (
            <Provider store={store}>
                {form}
            </Provider>
        );
    }
}

export default Rfi;
