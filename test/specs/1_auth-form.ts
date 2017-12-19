import * as assert from "assert";
import Constants from "../constants";

describe("mail.ru main page's auth form", () => {


    before(() => {
        browser.url(Constants.mailUrl);
    });

    it("should exist", async () => {
        await browser
            .$(Constants.mailboxBodySelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });


    it("should have text input", async () => {
        await browser
            .$(Constants.mailboxBodySelector)
            .$(Constants.textInputSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });

    it("should have password input", async () => {
        await browser
            .$(Constants.mailboxBodySelector)
            .$(Constants.passwordInputSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });

    it("should have submit input", async () => {
        await browser
            .$(Constants.mailboxBodySelector)
            .$(Constants.submitInputSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });

    it("should have @mail.ru domain selected", async () => {
        await browser
            .$(Constants.domainSelectSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            })
            .getValue(Constants.domainSelectSelector)
            .then((domain: string) => {
                assert.equal(domain, "@mail.ru");
            });
    });
});