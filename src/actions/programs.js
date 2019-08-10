import {slugify} from "../utils/formUtils";

// action creator
const setListData = listData => {
    window.programsList = listData;
    return {
        // ID
        type: 'GET_PROGRAMS_SUCCESS',
        // Payload
        listData
    }
};

const deactivateLoader = () => {
    return {
        type: 'DEACTIVATE_LOADER',
    }
};

const activateLoader = () => {
    return {
        type: 'ACTIVATE_LOADER',
    }
};

/**
 *
 * @returns {function(*): Promise<any | never>}
 */
export const getListData = (filter) => {
    return (dispatch) => {
        let URL;
        URL = "https://api.edpl.us/v1/asuo/programs";

        return fetch(URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                let listData = formatProgramResults(data, filter);
                dispatch(setListData(listData));
            })
            .then(dispatch(deactivateLoader()))
            .catch(error => dispatch(activateLoader()));
    };
};

function formatProgramResults(data, filter) {
    let importedPrograms = {};
    let interests = {};
    let categories = {};

    filter = filter.toString().split(';');
    filter = filter.map((f) => f.toLowerCase());

    data.forEach(function (program) {
        let category = program.category;
        let catSlug = slugify(category);

        if (Object.keys(categories).indexOf(catSlug) === -1) {
            categories[catSlug] = category;
        }
        if (Object.keys(importedPrograms).indexOf(catSlug) === -1) {
            importedPrograms[catSlug] = {};
        }

        program.key = [
            program.progcode,
            program.plancode,
            program.subplancode,
            program.concentration
        ].join('-').replace(/-*$/, '');

        program['interestareas'].forEach(function (interest) {
            let intSlug = slugify(interest);
            if (Object.keys(interests).indexOf(intSlug) === -1) {
                interests[intSlug] = interest;
            }
            if (Object.keys(importedPrograms[catSlug]).indexOf(intSlug) === -1) {
                importedPrograms[catSlug][intSlug] = {};
            }

            if (!filter) {
                importedPrograms[catSlug][intSlug][program.title] = program.key;
            } else {
                if (filter.findIndex(c => c.toLowerCase() === program.key.toLowerCase()) > 0) {
                    importedPrograms[catSlug][intSlug][program.title] = program.key;
                }
            }
        });
    });

    return {
        Categories: categories,
        Interests: interests,
        Programs: importedPrograms
    };
}