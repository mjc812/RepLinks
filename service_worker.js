import { foo } from './util.js';

chrome.runtime.onInstalled.addListener(() => {
    console.log("RepLinks Installed!");
    foo();
});

chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "knockknock");
    port.onMessage.addListener(function (msg) {
        const finalDestination = getFinalDestination(msg.shortenedURL);
        getFinalDestination(msg.shortenedURL)
            .then((finalDestination) => console.log(finalDestination))
            .catch((error) => console.log(finalDestination));
    });
});

const getFinalDestination = async (shortenedLink) => {
    try {
        const response = await fetch(shortenedLink, { method: 'GET' });
        const finalDestination = response.url;
        return finalDestination;
    } catch (error) {
        console.log(error);
        return null;
    }
};
