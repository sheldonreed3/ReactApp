import React from 'react';
import {RfiForm} from "./rfiForm";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../utils/mapUtils";
import {getProgramOptions, getCategoryOptions, getInterestOptions} from "../helpers/listHelpers";
import FormController from "./formController";

function setStep(step) {
    let event = new CustomEvent('rfi-step', {detail: {step: step}});
    window.dispatchEvent(event);
}

export class MultiStepBuild extends RfiForm {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
        setStep(this.state.step);
    }

    updateSelect = (element) => {
        let options = [];
        let className = element._reactInternalFiber.type.name;

        if (className) {
            switch (className) {
                case 'Categories':
                    options = this.props.listData[className];
                    if (options) {
                        options = getCategoryOptions(options);
                    }
                    break;
                case 'Interests':
                    let interests = this.props.listData[className];
                    let category = this.props.formData.category;

                    if (interests) {
                        options = getInterestOptions(interests, this.props.listData['Programs'], category);
                    }
                    break;
                default:
                    options = getProgramOptions(this.props.listData, this.props.formData.category, this.props.formData.interest);
            }
        }
console.dir(options);
        return options;
    };

    nextStep = (e) => {
        let value = this.props.program;

        if (!value || value === '_none') {
            this.setState({error: true});
        } else {
            let {step} = this.state;
            step = step + 1;

            this.setState({
                step: step,
                // Set error to true to prevent submission
                error: true
            });

            setStep(step);
        }
    };

    setComp = () => {
        const {step} = this.state;
        let fields = [];
        let error;
        if (step === 1) {
            error = this.state.error ? <span className="rfi-error">Please select a program.</span> : '';
        }

        if (step === 1) {
            fields = ['categories', 'interests', 'programs', 'next-step'];
        }
        else {
            fields = ['first-name', 'last-name', 'phone', 'email', 'prev-step', 'submit'];
        }

        return <div className='form-group second-step'>
            <FormController fields={fields} formData={this.props.formData} validate={this.validate} flagChange={this.flagChange} updateSelect={this.updateSelect}/>
            {error}
        </div>;
    };

    render() {
        if (this.state) {
            return super.render();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiStepBuild);