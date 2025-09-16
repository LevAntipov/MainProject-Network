export const required = value => {
    if (value) return undefined

    return "Required field"
}

export const maxLengthCreator = (maxlength) => {
    return (value) => {
        if (value && value.length < maxlength) {
            return undefined
        }
        return `Max length is ${maxlength} symbols`
    }
}
