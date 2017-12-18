import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";

describe("[positive] authentication", () => {
    let user: User;
    let loginField: any;
    let passwordField: any;
    let submitButton: any;
    const positiveResultUrl: string = "https://e.mail.ru/messages/inbox/";

    before(async () => {
        await browser.url("https://mail.ru/");
        await UserService.getUser()
            .then((returnedUser: User) => {
                user = returnedUser;
            });
        loginField = browser.$("input#mailbox\\:login");
        passwordField = browser.$("input#mailbox\\:password");
        submitButton = browser.$("input[value=\"Войти\"]");
    });

    it("needs a user first of all", () => {
        assert.notEqual(user, null);
    });

    it("should be successful without \"@mail.ru\" in email", () => {
        loginField.value = user.email.split("@")[0];
        passwordField.value = user.password;
        submitButton.click().then(() => {
            assert.equal(browser.getUrl().includes(positiveResultUrl), true);
        });
    });

    it("should be successful with \"@mail.ru\" in email", () => {
        loginField.value = user.email;
        passwordField.value = user.password;
        submitButton.click().then(() => {
            assert.equal(browser.getUrl().includes(positiveResultUrl), true);
        });
    });

    after(async () => {
        await UserService.freeUser(user.id);
        user = null;
    });
});