export const updateFormData = (name, value) => {
    return {
        type: 'UPDATE_FORM_DATA',
        name: name,
        value: value
    }
};

export const initFormData = () => {
    return {
        type: 'INIT_FORM_DATA'
    }
};

export const setFormData = (state = []) => {
    return (dispatch) => {
        if (state.length > 0) {
            dispatch(updateFormData(state));
        }
        else {
            dispatch(initFormData());
        }
    }
};
