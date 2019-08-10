import validator from 'validator';
import React from 'react';

export const intlTelValidate = (status, value) => {
  if (status === false) {
    if (value.length > 0) {
        return <span className="rfi-error">Invalid phone. Select flag icon, do not enter country code & check your digits.</span>;
    }
    else {
      return <span className="rfi-error">The phone field is required.</span>
    }
  }
  return status;
};

export const checkValid = (target) => {
  let name = target.name;
  let value = target.value;

  if (value === '' && target.required === true) {
    return value.toString().trim().length;
  }
  if (name === 'email') {
    return validator.isEmail(value);
  }
  if (name === 'phone') {
    if (/^([+0-9\-()\s]+)$/.test(value)) {
      return window.intlTelInputUtils.isValidNumber(value, target.countryCode);
    }

    return false;
  }
  if (name === 'zip-code' && target.countryCode === 'USA') {
    return /^\b\d{5}(-\d{4})?\b$/.test(value);
  }

  return true;
};

export const validate = (target) => {
  console.dir(target);
  let name = target.name;
  let title = target.title;
  let value = target.value;

  if (value === '' && target.required === true) {
    return required(value, title);
  }
  if (name === 'email') {
    return email(value, title);
  }
  if (name === 'phone') {
    return phone(value, target.countryCode);
  }
  if (name === 'zip-code' && target.countryCode === 'USA') {
    return zipCode(value);
  }

  return false;
};

const required = (value, name) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="rfi-error">The {name} field is required.</span>;
  }
  return false;
};

const email = (value, name) => {
  if (!validator.isEmail(value)) {
    return <span className="rfi-error">{value} is not a valid email for the {name} field.</span>
  }
  return false;
};

const phone = (value, cc) => {
  let check = /^([+0-9\-()\s]+)$/.test(value);
  if (!check || !window.intlTelInputUtils.isValidNumber(value, cc)) {
    return <span className="rfi-error">Invalid phone. Select flag icon, do not enter country code & check your digits.</span>;
  }
  return false;
};

const zipCode = (value) => {
  if (!/^\b\d{5}(-\d{4})?\b$/.test(value)) {
    return <span className="rfi-error">{value} is not a valid zip code.</span>;
  }
};
