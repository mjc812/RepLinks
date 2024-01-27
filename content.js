let previousLink = null;

const modifyCaptionLink = () => {
    const captionLink = getCaptionLink();
    if (captionLink) {
        const captionSpan = captionLink.querySelector('span');
        if (captionSpan && captionLink.href !== previousLink) {
            console.log(captionSpan.href);
            previousLink = captionLink.href;
        }
    }
};

const handleMutation = (mutationsList, mutationObserver) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            modifyCaptionLink();
        }
    }
};

const getCaptionLink = () => {
    const postContents = document.querySelectorAll('div[data-test-id="post-content"]');

    if (postContents.length > 0) {
        const postContainer = postContents[0];
        const imageSection = postContainer.querySelector(':nth-child(5)');

        const captionSpan = imageSection.querySelector('span:has(> a)');

        if (captionSpan) {
            const captionLink = captionSpan.querySelector('a');
            if (captionLink) return captionLink;
        }

    }

    return null;
};

const targetObservationNode = document.body;
const observationConfig = { childList: true, subtree: true };
const mutationObserver = new MutationObserver(handleMutation);
mutationObserver.observe(targetObservationNode, observationConfig);
