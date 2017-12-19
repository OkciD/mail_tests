export default abstract class Constants {
    public static readonly mailUrl: string = "https://mail.ru/";
    public static readonly mailboxBodySelector: string = "form#auth div.mailbox__body";
    public static readonly textInputSelector: string = "input[type=\"text\"]";
    public static readonly passwordInputSelector: string = "input[type=\"password\"]";
    public static readonly submitInputSelector: string = "input[type=\"submit\"]";
    public static readonly domainSelectSelector: string = "select#mailbox\\:domain";

    public static readonly loginFieldSelector: string = "input#mailbox\\:login";
    public static readonly passwordFieldSelector: string = "input#mailbox\\:password";
    public static readonly submitButtonSelector: string = "input[value=\"Войти\"]";
    public static readonly positiveResultUrl: string = "https://e.mail.ru/messages/inbox/";
    public static readonly logoutLinkSelector: string = "a#PH_logoutLink";
    public static readonly pageLoadingTimeDelay: number = 5000;

    public static readonly inputErrorClass: string = "is-error";
    public static readonly validationTimeDelay: number = 1000;
}