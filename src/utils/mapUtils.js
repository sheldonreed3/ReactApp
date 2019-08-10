import {getListData} from "../actions/programs";
import {updateFormData} from "../actions/formData";

/**
 *
 * @param state
 * @returns {{listData: (*|programsReducer), formData: (*|formDataReducer|(()))}}
 */
export const mapStateToProps = (state) => ({
    listData: state.listData,
    formData: state.formData
});

/**
 *
 * @param dispatch
 * @returns {{updateFormData: updateFormData, getListData: getListData, initFormData: initFormData}}
 */
export const mapDispatchToProps = dispatch => ({
    initFormData: () => {
        dispatch({type: 'INIT_FORM_DATA'})
    },
    updateFormData: (name, value) => {
        dispatch(updateFormData(name, value))
    },
    getListData: (filter) => {
        dispatch(getListData(filter))
    },
});
