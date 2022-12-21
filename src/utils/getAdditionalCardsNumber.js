export default function getAdditionalCardsNumber(width) {
    if (width >= 1280) {
        return 3;
    } else if (width >= 768) {
        return 2;
    }
    return 1;
}