import User from "./user";
import httpSend from "./httpSend";
import * as webdriverio from "webdriverio";

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
            });

        this.lol();
    }

    private lol(): void {
        let options = {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        };

        webdriverio
            .remote(options)
            .init()
            .url('http://www.google.com')
            .getTitle().then(function(title) {
            console.log('Title was: ' + title);
        })
            .end()
            .catch(function(err) {
                console.log(err);
            });
    }
}

new Application();