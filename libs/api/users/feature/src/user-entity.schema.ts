import { IUser } from "../../util/src/interfaces";
import {EntitySchema} from "typeorm";

export const UserEntity = new EntitySchema<IUser>({
    name: 'User',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        firstName: {
            type: String,
            length: 100
        },
        email: {
            type: String,
            length: 100
        },
        lastName: {
            type: String,
            length: 100
        },
        username: {
            type: String,
            length: 100
        },
    }, 
});
