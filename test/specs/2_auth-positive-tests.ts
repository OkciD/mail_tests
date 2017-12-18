import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";

describe("authentication", () => {
    let user: User;

    before(async () => {
        await UserService.getUser()
            .then((returnedUser: User) => {
                user = returnedUser;
            });
    });

    it("needs a user first of all", () => {
        assert.notEqual(user, null);
    });

    after(async () => {
        await UserService.freeUser(user.id);
        user = null;
    });
});