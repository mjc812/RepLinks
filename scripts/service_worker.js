import { convertLink } from './util.js';

chrome.runtime.onInstalled.addListener(() => {
    console.log("RepLinks Installed!");
});

chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "knockknock");
    port.onMessage.addListener(function (msg) {
        if (msg.url.includes('allapp')) {
            getFinalDestination(msg.url)
                .then((expandedURL) => {
                    convertLink(expandedURL);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            convertLink(msg.url);
        }
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
