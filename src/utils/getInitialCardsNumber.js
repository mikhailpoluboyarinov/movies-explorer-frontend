import {CARDS_CONSTANTS} from "./Constants";

export default function getInitialCardsNumber(width) {
    if (width >= CARDS_CONSTANTS.windowWidth1280) {
        return CARDS_CONSTANTS.initialCardsMore1280;
    } else if (width >= CARDS_CONSTANTS.windowWidth768) {
        return CARDS_CONSTANTS.initialCardsMore768;
    }
    return CARDS_CONSTANTS.initialCardsLess768;
}