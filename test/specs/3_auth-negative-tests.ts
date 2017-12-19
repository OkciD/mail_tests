import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";

describe("[negative] authentication", () => {
    let user: User;
    const mailUrl: string = "https://mail.ru/";
    const loginFieldSelector: string = "input#mailbox\\:login";
    const passwordFieldSelector: string = "input#mailbox\\:password";
    const submitButtonSelector: string = "input[value=\"Войти\"]";
    const inputErrorClass: string = "is-error";
    const validationTimeDelay: number = 1000;

    before(async () => {
        await browser.url(mailUrl);
        await UserService.getUser()
            .then((returnedUser: User) => {
                user = returnedUser;
            });
    });

    after(async () => {
        await UserService.freeUser(user.id);
        user = null;
    });

    it("shouldn't work with incorrect email and password", async () => {
        await browser
            .setValue(loginFieldSelector, "foo")
            .setValue(passwordFieldSelector, "bar")
            .click(submitButtonSelector)
            .pause(validationTimeDelay)
            .getAttribute(loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            })
            .getAttribute(passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            });
    });

    it("should not succeed with empty login", async () => {
        await browser
            .setValue(loginFieldSelector, "")
            .setValue(passwordFieldSelector, "bar")
            .click(submitButtonSelector)
            .pause(validationTimeDelay)
            .getAttribute(loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            });
    });

    it("should not succeed with empty password", async () => {
        await browser
            .setValue(loginFieldSelector, "foo")
            .setValue(passwordFieldSelector, "")
            .click(submitButtonSelector)
            .pause(validationTimeDelay)
            .getAttribute(passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            });
    });

    it("is impossible without both email and password", async () => {
        await browser
            .setValue(loginFieldSelector, "")
            .setValue(passwordFieldSelector, "")
            .click(submitButtonSelector)
            .pause(validationTimeDelay)
            .getAttribute(loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            })
            .getAttribute(passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            });
    });

    it("should not work with whitespaces in email", async () => {
        await browser
            .setValue(loginFieldSelector, " " + user.email)
            .setValue(passwordFieldSelector, user.id)
            .click(submitButtonSelector)
            .pause(validationTimeDelay)
            .getAttribute(loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            });
    });

    it("definitely won't work with forbidden chars in password", async () => {
        await browser
            .setValue(loginFieldSelector, user.email)
            .setValue(passwordFieldSelector, " " + user.password)
            .click(submitButtonSelector)
            .pause(validationTimeDelay)
            .getAttribute(passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(inputErrorClass), true);
            });
    })
});
