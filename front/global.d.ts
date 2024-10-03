type Messages = typeof import ("./elegannza/messages/es.json");
type EnMessages = typeof import ("./elegannza/messages/en.json");

declare interface IntlMessages extends Messages, EnMessages{}