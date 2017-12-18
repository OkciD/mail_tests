import * as assert from "assert";

describe("authentication", () => {
    let loginField: any;
    let passwordField: any;
    let submitButton: any;
    const negativeResultUrl: string = "https://e.mail.ru/login";

    before(async () => {
        await browser.url("https://mail.ru/");
        loginField = browser.$("input#mailbox\\:login");
        passwordField = browser.$("input#mailbox\\:password");
        submitButton = browser.$("input[value=\"Войти\"]");
    });

    it("should be unsuccessful when login and password are wrong", () => {
        loginField.value = "foo";
        passwordField.value = "bar";
        submitButton.click().then(() => {
            assert.equal(browser.getUrl().includes(negativeResultUrl), true);
            assert.equal(browser.isExisting("div.b-login__errors"), true);
        });
    });
});
