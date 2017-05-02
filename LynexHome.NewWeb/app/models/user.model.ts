export class User {
    id: string;
    name: string;
    email: string;
    phone: string;

    isAuthenticated(): boolean { return this.id !== null; };

    constructor(userObject?: any) {
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