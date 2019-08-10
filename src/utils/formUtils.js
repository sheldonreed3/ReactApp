/**
 * Dispatch custom form step event.
 *
 * @param step
 */
export function setStep(step) {
    let event = new CustomEvent('rfi-step', {detail: {step: step}});
    window.dispatchEvent(event);
}

export const ucWords = (str) => {
    return str.toLowerCase().replace(/[_\-]/, ' ').replace(/\b[a-z]/g, function (char) {
        return char.toUpperCase();
    });
};

export const slugify = (str) => {
    return str.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};