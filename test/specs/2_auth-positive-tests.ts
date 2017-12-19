import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";
import Constants from "../constants";

describe("[positive] authentication", () => {
    let user: User;

    before(async () => {
        await UserService.getUser()
            .then((returnedUser: User) => {
                user = returnedUser;
            });
    });

    after(async () => {
        await UserService.freeUser(user.id);
        user = null;
    });

    it("needs a user first of all", () => {
        assert.notEqual(user, null);
    });

    it("should be successful without \"@mail.ru\" in email", async () => {
        await browser
            .url(Constants.mailUrl)
            .setValue(Constants.loginFieldSelector, user.email.split("@")[0])
            .setValue(Constants.passwordFieldSelector, user.password)
            .click(Constants.submitButtonSelector)
            .pause(Constants.pageLoadingTimeDelay)
            .getUrl()
            .then((url: string) => {
                assert.equal(url.includes(Constants.positiveResultUrl), true);
            });
    });

    it("should be successful with \"@mail.ru\" in email", async () => {
        await browser
            .pause(Constants.pageLoadingTimeDelay)
            .click(Constants.logoutLinkSelector)
            .setValue(Constants.loginFieldSelector, user.email)
            .setValue(Constants.passwordFieldSelector, user.password)
            .click(Constants.submitButtonSelector)
            .pause(Constants.pageLoadingTimeDelay)
            .getUrl()
            .then((url: string) => {
                assert.equal(url.includes(Constants.positiveResultUrl), true);
            });
    });
});