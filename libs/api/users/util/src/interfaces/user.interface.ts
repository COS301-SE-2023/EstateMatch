export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;

    //using references to make the properties user specific
    properties: string[]; //hold the titles of the properties
}