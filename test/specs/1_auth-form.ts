import * as assert from "assert";

describe("mail.ru main page's auth form", () => {
    const mailUrl: string = "https://mail.ru/";
    const mailboxBodySelector: string = "form#auth div.mailbox__body";
    const textInputSelector: string = "input[type=\"text\"]";
    const passwordInputSelector: string = "input[type=\"password\"]";
    const submitInputSelector: string = "input[type=\"submit\"]";
    const domainSelectSelector: string = "select#mailbox\\:domain";

    before(() => {
        browser.url(mailUrl);
    });

    it("should exist", async () => {
        await browser
            .$(mailboxBodySelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });


    it("should have text input", async () => {
        await browser
            .$(mailboxBodySelector)
            .$(textInputSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });

    it("should have password input", async () => {
        await browser
            .$(mailboxBodySelector)
            .$(passwordInputSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });

    it("should have submit input", async () => {
        await browser
            .$(mailboxBodySelector)
            .$(submitInputSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            });
    });

    it("should have @mail.ru domain selected", async () => {
        await browser
            .$(domainSelectSelector)
            .isExisting()
            .then((exists: boolean) => {
                assert.equal(exists, true);
            })
            .getValue(domainSelectSelector)
            .then((domain: string) => {
                assert.equal(domain, "@mail.ru");
            });
    });
});