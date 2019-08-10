import React from 'react';
import * as Fields from '../components/fields';
import {ucWords} from "../utils/formUtils";
import {validate} from "../validate/inputValidators";

const formFields = function(fields) {
    let formFields = [];
    fields.forEach(function (item) {
        let name = item.replace('-', ' ');
        name = ucWords(name).replace(' ', '');
        let component = Fields[name];
        formFields.push(component);
    });
    return formFields;
};

class FormController extends React.Component {

    render() {
        const {fields, formData, validate, flagChange, updateSelect} = this.props;
        let components = formFields(fields);

        return <div className="rfi-fields">
            {components.map((comp, i) => {
                // Let's pass the value so we only have to compute the prop name here.
                let key = comp.name.charAt(0).toLowerCase() + comp.name.slice(1);
                let value = formData ? formData[key] : '';
                // We will also pass the change handler as a prop because some components will need it.
                return React.createElement(comp, {key: i, value: value, onBlur: validate, flagChange: flagChange, updateSelect: updateSelect});
            })}
        </div>
    }
}

export default FormController;