import { Deserializable } from "./deserializable.model";

export class User extends Deserializable{
    id: string;
    name: string;
    email: string;
    phone: string;

    isAuthenticated(): boolean { return this.id !== null; };

    constructor(userObject?: any) {
        super();
        if (userObject) {
            if (userObject.id) {
                this.id = userObject.id;
            }

            if (userObject.name) {
                this.name = userObject.name;
            }

            if (userObject.email) {
                this.email = userObject.email;
            }

            if (userObject.phone) {
                this.phone = userObject.phone;
            }
        }
    }
}