export default function randomNaturalNumber(min: number, max: number): number {
    // Check if min and max are valid numbers
    // if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    //     throw new Error('Invalid input: min and max must be integers and min must be less than max');
    // }

    if (min >= max) {
        return max;
    }

    // Generate random number within range [min, max]
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}