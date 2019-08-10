import React from 'react';
import ReactSelect from 'react-select';
import {ucWords} from "../utils/formUtils";
import IntlTelInput from 'react-intl-tel-input';
import '../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../node_modules/react-intl-tel-input/dist/main.css';

export class FirstName extends React.Component {
    render() {
        const name = 'first_name';
        let label = ucWords(name);
        return <input
            name={name}
            className={"field-type-text field-rfi-" + name}
            required="required"
            onBlur={this.props.onBlur}
            placeholder={label + '*'}
            title={label}
            aria-label={label}/>
    }
}

export class LastName extends React.Component {
    render() {
        const name = 'last_name';
        let label = ucWords(name);
        return <input
            name={name}
            className={"field-type-text field-rfi-" + name}
            required="required"
            onBlur={this.props.onBlur}
            placeholder={label + '*'}
            title={label}
            aria-label={label}/>
    }
}

export class Email extends React.Component {
    render() {
        const name = 'email';
        let label = ucWords(name);
        return <input
            name={name}
            className={"field-type-text field-rfi-" + name}
            required="required"
            onBlur={this.props.onBlur}
            placeholder={label + '*'}
            title={label}
            aria-label={label}/>
    }
}

export class Phone extends React.Component {
    render() {
        const name = 'phone';
        let label = ucWords(name);
        return <IntlTelInput
            name={name}
            css={['intl-tel-input', 'field-type-phone field-rfi-' + name]}
            utilsScript={'libphonenumber.js'}
            onSelectFlag={this.props.flagChange}
            required="required"
            onBlur={this.props.onBlur}
            type="phone"
            placeholder={label + '*'}
            title={label}
            aria-label={label}/>
    }
}

export class Categories extends React.Component {
    render() {
        const name = 'category';
        let label = ucWords(name);
        let options = this.props.updateSelect(this);

        return <ReactSelect
            name={name}
            className="rfi-select"
            classNamePrefix={name}
            isClearable={true}
            options={options}
            title={label}
            aria-label={label}
            styles={{
                menu: (base) => ({...base, marginTop: 0})
            }}
        />;
    }
}

export class Interests extends React.Component {
    render() {
        const name = 'interest';
        let label = ucWords(name);
        let options = this.props.updateSelect(this);

        return <ReactSelect
            name={name}
            className="rfi-select"
            classNamePrefix={name}
            isClearable={true}
            options={options}
            title={label}
            aria-label={label}
            styles={{
                menu: (base) => ({...base, marginTop: 0})
            }}
        />;
    }
}

export class Programs extends React.Component {
    render() {
        const name = 'program';
        let label = ucWords(name);
        let options = this.props.updateSelect(this);

        return <ReactSelect
            name={name}
            className="rfi-select"
            classNamePrefix={name}
            isClearable={true}
            title={label}
            aria-label={label}
            options={options}
            onBlur={this.props.onBlur}
            styles={{
                menu: (base) => ({...base, marginTop: 0})
            }}
        />;
    }
}

export class NextStep extends React.Component {
    render() {
        return (
            <button></button>
        );
    }
}

export class PrevStep extends React.Component {
    render() {
        return (
            <button></button>
        );
    }
}

export class Submit extends React.Component {
    render() {
        return (
            <button></button>
        );
    }
}
