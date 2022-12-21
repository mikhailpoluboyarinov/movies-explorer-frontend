function convertDuration(duration) {
    const hours = Math.trunc(duration / 60)
    const minutes = duration - (hours * 60)

    if(hours > 0) {
        return `${hours} ч. ${minutes} мин.`
    } return `${minutes} мин.`
}

export default convertDuration
