import * as assert from "assert";

describe("mail.ru main page's auth form", () => {
    let mailboxBody: Client<Element> & Element;

    before(() => {
        browser.url("https://mail.ru/");
    });

    it("should exist", () => {
        mailboxBody = browser.$("form#auth div.mailbox__body");
        assert.equal(mailboxBody.isExisting(), true);
    });


    it("should have all the necessary inputs", () => {
        const inputTypes: Set<string> = new Set(["text", "password", "checkbox", "submit"]);
        const inputs = mailboxBody.$$("input");

        assert.equal(inputTypes.size, inputs.length);

        const hasAllInputs: boolean = inputs
            .every((input: HTMLInputElement) => {
                return inputTypes.has(input.getAttribute("type"));
            });
        assert.equal(hasAllInputs ,true);
    });

    it("should have @mail.ru domain selected", () => {
        const domainSelector: HTMLSelectElement = mailboxBody.$("select#mailbox\\:domain");

        assert.equal(domainSelector.isExisting(), true);
        assert.equal(domainSelector.getValue(), "@mail.ru");
    });
});