import {CARDS_CONSTANTS} from "./Constants";

export default function getAdditionalCardsNumber(width) {
    if (width >= CARDS_CONSTANTS.windowWidth1280) {
        return CARDS_CONSTANTS.addCardsMore1280;
    } else if (width >= CARDS_CONSTANTS.windowWidth768) {
        return CARDS_CONSTANTS.addCardsMore768;
    }
    return CARDS_CONSTANTS.addCardsLess768;
}