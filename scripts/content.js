const handleMutation = (mutationsList, mutationObserver) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            console.log("Modification on target.");
        }
    }
};

const targetObservationNode = document.body;
const observationConfig = { childList: true, subtree: true };
const mutationObserver = new MutationObserver(handleMutation);
mutationObserver.observe(targetObservationNode, observationConfig);
