export default function getInitialCardsNumber(width) {
    if (width >= 1280) {
        return 12;
    } else if (width >= 768) {
        return 8;
    }
    return 5;
}