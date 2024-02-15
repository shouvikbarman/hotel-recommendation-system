export default function isNumberInRange(number: number, range: [number, number]): boolean {
    const [min, max] = range;
    return number >= min && number <= max;
}