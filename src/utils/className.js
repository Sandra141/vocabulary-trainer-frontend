

const getColorClassName = number => {
    const classNames = ["lightBlue", "darkBlue", "gray", "pink"]

    const calculateIndex = number % classNames.length

    return classNames[calculateIndex]
}


export {
    getColorClassName,
} 