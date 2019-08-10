
const programsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROGRAMS_SUCCESS':
            return action.listData;
        default:
            return state;
    }
};

export default programsReducer;