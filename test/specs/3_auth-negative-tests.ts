import * as assert from "assert";
import User from "../../src/user";
import UserService from "../../src/user-service";

function getRandomLengthWhitespacesString(): string {
    return " ".repeat(Math.floor(Math.random() * 10));
}

function assertNotRedirected(): void {
    assert.equal(browser.getUrl(), "https://mail.ru/");
}

function assertRedirected(newUrl: string): void {
    assert.equal(browser.getUrl(), newUrl);
}

function assertHasError(input: HTMLInputElement): void {
    assert.equal(input.getAttribute("class").includes("is-error"), true);
}

function assertDoesntHaveError(input: HTMLInputElement): void {
    assert.equal(input.getAttribute("class").includes("is-error"), false);
}

describe("[negative] authentication", () => {
    let loginField: any;
    let passwordField: any;
    let submitButton: any;
    const negativeResultUrl: string = "https://e.mail.ru/login";
    let user: User;

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

    it("should be unsuccessful when login and password are wrong", () => {
        loginField.value = "foo";
        passwordField.value = "bar";
        submitButton.click().then(() => {
            assertRedirected(negativeResultUrl);
            assert.equal(browser.isExisting("div.b-login__errors"), true);
        });
    });

    it("should not succeed with empty login", () => {
        loginField.value = "";
        passwordField.value = "foo";
        submitButton.click().then(() => {
            assertNotRedirected();
            assertHasError(loginField);
            assertDoesntHaveError(passwordField);
        });
    });

    it("should not succeed with empty password", () => {
        loginField.value = "foo";
        passwordField.value = "";
        submitButton.click().then(() => {
            assertNotRedirected();
            assertDoesntHaveError(loginField);
            assertHasError(passwordField);
        });
    });

    it("is impossible without both email and password", () => {
        loginField.value = "";
        passwordField.value = "";
        submitButton.click().then(() => {
            assertNotRedirected();
            assertHasError(loginField);
            assertHasError(passwordField);
        });
    });

    it("should not work with whitespaces in email", () => {
        loginField.value = getRandomLengthWhitespacesString() + user.email + getRandomLengthWhitespacesString();
        passwordField.value = user.password;
        submitButton.click().then(() => {
            assertNotRedirected();
            assertHasError(loginField);
            assertDoesntHaveError(passwordField);
        });
    });

    it("definitely won't work with forbidden chars in password", () => {
        loginField.value = "";
        passwordField.setValue("lol").then(() => {
            assertHasError(passwordField);
        });
    });

    after(async () => {
        await UserService.freeUser(user.id);
        user = null;
    });
});
