export interface ICollection {
    /**
     * Method to convert data to JSON
     * @return string
     */
    toJSON(): string;
    /**
     * Method to return data
     * @param T[]
     */
    getData<T>(): T[];
}
