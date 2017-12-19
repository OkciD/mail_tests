import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";
import Constants from "../constants";

describe("[negative] authentication", () => {
    let user: User;


    before(async () => {
        await browser.url(Constants.mailUrl);
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
            .setValue(Constants.loginFieldSelector, "foo")
            .setValue(Constants.passwordFieldSelector, "bar")
            .click(Constants.submitButtonSelector)
            .pause(Constants.validationTimeDelay)
            .getAttribute(Constants.loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            })
            .getAttribute(Constants.passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            });
    });

    it("should not succeed with empty login", async () => {
        await browser
            .setValue(Constants.loginFieldSelector, "")
            .setValue(Constants.passwordFieldSelector, "bar")
            .click(Constants.submitButtonSelector)
            .pause(Constants.validationTimeDelay)
            .getAttribute(Constants.loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            });
    });

    it("should not succeed with empty password", async () => {
        await browser
            .setValue(Constants.loginFieldSelector, "foo")
            .setValue(Constants.passwordFieldSelector, "")
            .click(Constants.submitButtonSelector)
            .pause(Constants.validationTimeDelay)
            .getAttribute(Constants.passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            });
    });

    it("is impossible without both email and password", async () => {
        await browser
            .setValue(Constants.loginFieldSelector, "")
            .setValue(Constants.passwordFieldSelector, "")
            .click(Constants.submitButtonSelector)
            .pause(Constants.validationTimeDelay)
            .getAttribute(Constants.loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            })
            .getAttribute(Constants.passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            });
    });

    it("should not work with whitespaces in email", async () => {
        await browser
            .setValue(Constants.loginFieldSelector, " " + user.email)
            .setValue(Constants.passwordFieldSelector, user.id)
            .click(Constants.submitButtonSelector)
            .pause(Constants.validationTimeDelay)
            .getAttribute(Constants.loginFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            });
    });

    it("definitely won't work with forbidden chars in password", async () => {
        await browser
            .setValue(Constants.loginFieldSelector, user.email)
            .setValue(Constants.passwordFieldSelector, " " + user.password)
            .click(Constants.submitButtonSelector)
            .pause(Constants.validationTimeDelay)
            .getAttribute(Constants.passwordFieldSelector, "class")
            .then((classesString: string) => {
                assert.equal(classesString.includes(Constants.inputErrorClass), true);
            });
    })
});
