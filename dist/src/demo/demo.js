"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var skyweb_1 = require("../skyweb");
var username = process.argv[2];
var password = process.argv[3];
if (!username || !password) {
    throw new Error('Username and password should be provided as commandline arguments!');
}
var skyweb = new skyweb_1.default();
skyweb.login(username, password).then(function (skypeAccount) {
    console.log('Skyweb is initialized now');
    console.log('Here is some info about you:' + JSON.stringify(skyweb.skypeAccount.selfInfo, null, 2));
    console.log('Your contacts : ' + JSON.stringify(skyweb.contactsService.contacts, null, 2));
    console.log('Going incognito.');
    skyweb.setStatus('Hidden');
}).catch(function (reason) {
    console.log(reason);
});
skyweb.messagesCallback = function (messages) {
    messages.forEach(function (message) {
        if (message.resource.from.indexOf(username) === -1 && message.resource.messagetype !== 'Control/Typing' && message.resource.messagetype !== 'Control/ClearTyping') {
            var conversationLink = message.resource.conversationLink;
            var conversationId = conversationLink.substring(conversationLink.lastIndexOf('/') + 1);
            skyweb.sendMessage(conversationId, message.resource.content + '. Cats will rule the World');
        }
    });
};
var errorCount = 0;
var errorListener = function (eventName, error) {
    console.log(errorCount + " : Error occured : " + error);
    errorCount++;
    if (errorCount === 10) {
        console.log("Removing error listener");
        skyweb.un('error', errorListener);
    }
};
skyweb.on('error', errorListener);
//# sourceMappingURL=demo.js.map