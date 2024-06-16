import * as _ from 'lodash'

/**
 * Clean text by removing leading and trailing whitespaces and replacing multiple whitespaces with a single whitespace
 *
 * @param text
 * @returns
 */
export function cleanText(text: string) {
    // Remove leading and trailing whitespaces
    // Replace multiple whitespaces with a single whitespace
    return _.chain(text).trim().replace(/\s+/g, ' ').value()
}

/**
 * Capitalize the first letter of a text
 *
 * @param text
 * @returns 
 */
export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
