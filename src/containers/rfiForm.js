import React from 'react';
import {connect} from "react-redux";
import {mapStateToProps, mapDispatchToProps} from '../utils/mapUtils';
import FormController from './formController';
import {checkValid, validate, intlTelValidate} from "../validate/inputValidators";
import {alpha2ToAlpha3} from "i18n-iso-countries";

export class RfiForm extends React.Component {
    /**
     * After the component has mounted, set the init props and send the listData to window storage.
     */
    componentDidMount() {
        this.props.initFormData();
        window.programsList = this.props.listData;
    }

    /**
     * Grab the programs list from the API if we don't have it already stored for this page.
     */
    componentWillMount() {
        if (typeof window.programsList === 'undefined') {
            this.props.getListData(this.props.filter);
        }
    }

    submitRfi = (event) => {
        event.preventDefault();
    };

    /**
     * Validate form elements and set error state as necessary.
     *
     * @param e
     */
    validate = (e) => {
        this.setState({
            error: validate(e.target)
        });
    };

    /**
     * Save country code from flag dropdown to the country prop.
     *
     * @param ele
     * @param countryData
     */
    flagChange = (ele, countryData) => {
        let country = alpha2ToAlpha3(countryData.iso2.toUpperCase());

        this.props.updateFormData('country', country);
    };

    /**
     * Handle basic form changes.
     *
     * @param e Event
     */
    handleChange = (e) => {
        const {name, value} = e.target;

        this.props.updateFormData(name, value);
    };

    setComp = () => {
        let fields = typeof this.props.fields !== 'undefined' ? this.props.fields : ['first-name', 'last-name', 'phone', 'email', 'programs', 'submit'];
        return <div className="form-content">
            <FormController fields={fields} formData={this.props.formData} validate={this.validate} flagChange={this.flagChange}/>
        </div>
    };

    render() {
        let comp = this.setComp();
        let error = this.state !== null ? this.state.error : '';

        return <form onSubmit={this.submitRfi} onChange={this.handleChange}>
            {comp}
            {error}
        </form>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RfiForm);