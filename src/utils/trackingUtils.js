import $ from 'jquery';

/**
 * Grab UTM params from URL and add them to localStorage and cookies.
 */
export const setTrackingParams = () => {
    let query = window.location.search;

    if (query && query.indexOf('utm_') >= 0) {
        // Add the UTM params to the localStorage.
        window.localStorage.setItem('_utm_params', query.substr(1));

        // If we have the jQuery cookie library, let's add this to cookies as well.
        if (typeof $.cookie === 'function') {
            $.cookie('__utm_params', query.substr(1));
        }
    }
};

/**
 * Get UTM parameters URL, localStorage or cookies.
 *
 * @returns {Array}
 */
export const getTrackingParams = () => {
    let query = window.location.search;
    let $localStore = window.localStorage.getItem('_utm_params');
    let queryArr = [];

    // Copy UTM params from URL
    if (query && query.indexOf('utm_') >= 0) {
        queryArr = query.substr(1).split('&');
    }
    else if ($localStore) {
        queryArr = decodeURIComponent($localStore).split('&');
    }
    else {
        let key = '__utm_params';
        let keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        let $cookie = keyValue ? keyValue[2] : null;
        queryArr = decodeURIComponent($cookie).split('&');
    }

    return queryArr;
};
