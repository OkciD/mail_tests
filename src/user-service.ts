import User from "./user";
import httpSend from "./httpSend";


export default abstract class UserService {
    private static readonly usersDbServerUrl: string = "http://localhost:5000";

    public static getUser(): Promise<User> {
        return httpSend(`${UserService.usersDbServerUrl}/getuser`, "GET")
            .then((user: User) => {
                return user;
            })
            .catch((errorJson: {error: string}) => {
                console.log(errorJson.error);
                return null;
            });
    }

    public static freeUser(id: number): void {
        httpSend(`${this.usersDbServerUrl}/freeuser`, "DELETE", {id})
            .then((infoMessage: {message: string}) => {
                console.log(infoMessage.message)
            });
    }
}