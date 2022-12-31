import {CONVERT_CONSTANTS} from "./Constants";

function convertDuration(duration) {
    const hours = Math.trunc(duration / CONVERT_CONSTANTS.minutes)
    const minutes = duration - (hours * CONVERT_CONSTANTS.minutes)

    if(hours > 0) {
        return `${hours} ч. ${minutes} мин.`
    } return `${minutes} мин.`
}

export default convertDuration
