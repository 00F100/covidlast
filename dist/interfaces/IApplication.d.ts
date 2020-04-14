export interface IApplication {
    /**
     * Method to listen port of Application
     *
     * @param port string | number
     * @return boolean
     */
    listen(port?: string | number): boolean;
}
