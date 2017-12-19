import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";

describe("[positive] authentication", () => {
    let user: User;
    const mailUrl: string = "https://mail.ru/";
    const loginFieldSelector: string = "input#mailbox\\:login";
    const passwordFieldSelector: string = "input#mailbox\\:password";
    const submitButtonSelector: string = "input[value=\"Войти\"]";
    const positiveResultUrl: string = "https://e.mail.ru/messages/inbox/";
    const logoutLinkSelector: string = "a#PH_logoutLink";
    const pageLoadingTimeDelay: number = 5000;

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
            .url(mailUrl)
            .setValue(loginFieldSelector, user.email.split("@")[0])
            .setValue(passwordFieldSelector, user.password)
            .click(submitButtonSelector)
            .pause(pageLoadingTimeDelay)
            .getUrl()
            .then((url: string) => {
                assert.equal(url.includes(positiveResultUrl), true);
            });
    });

    it("should be successful with \"@mail.ru\" in email", async () => {
        await browser
            .click(logoutLinkSelector)
            .setValue(loginFieldSelector, user.email)
            .setValue(passwordFieldSelector, user.password)
            .click(submitButtonSelector)
            .pause(pageLoadingTimeDelay)
            .getUrl()
            .then((url: string) => {
                assert.equal(url.includes(positiveResultUrl), true);
            });
    });
});