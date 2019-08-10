const initState = () => {
    return {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 'USA',
        program: '',
        interest: null,
        category: null,
        step: null,
        error: false,
    }
};

const formDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            let update = {[action.name]: action.value};
            return {...state, ...update};
        case 'INIT_FORM_DATA':
            return {...initState()};
        default:
            return state;
    }
};

export default formDataReducer;