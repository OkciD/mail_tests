import User from "./user";
import httpSend from "./httpSend";

class Application {
    private readonly usersDbServerUrl: string = "http://localhost:5000";
    private user: User;

    constructor() {
        httpSend(`${this.usersDbServerUrl}/getuser`, "GET")
            .then((user: User) => {
                this.user = user;
            })
            .catch((errorJson: {error: string}) => {
                console.log(errorJson.error);
                // TODO: remove
                httpSend(`${this.usersDbServerUrl}/freeall`, "DELETE")
                    .then(() => {
                        console.log("All users disengaged");
                    })
                    .catch(() => {
                        console.log("Oops");
                    })
            })
    }
}

new Application();