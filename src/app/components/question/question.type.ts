export type Question = {
    id: number,
    factor: string
    text: string,
    reversed: boolean,
    options?: Option[],
    likert?: number
}

export type Option = {
    text: string,
    likert: number
}