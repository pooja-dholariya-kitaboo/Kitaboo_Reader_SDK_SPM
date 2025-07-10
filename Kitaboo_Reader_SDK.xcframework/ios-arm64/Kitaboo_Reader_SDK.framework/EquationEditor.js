function addEventHandlerOnCancelButton() {
    let cancelButton = document.getElementsByClassName('cancelBtn')[0];
    if(cancelButton!=null) {
        cancelButton.addEventListener('click', function() {
            let messageToPost = "cancelBtn";
            webkit.messageHandlers.cancelButtonClicked.postMessage(messageToPost);
        });
    }

}
function addEventHandlerOnHideKeyBoardButton() {
    let cancelButton = document.getElementsByClassName('abcIcon')[0];
    if(cancelButton!=null) {
        cancelButton.addEventListener('click', function() {
            let messageToPost = "cancelBtn";
            webkit.messageHandlers.cancelButtonClicked.postMessage(messageToPost);
        });
    }
}


function addEventHandlerOnGotItButton() {
    let gotItButton = document.getElementsByClassName('gotItBtn')[0];
    if(gotItButton!=null) {
        gotItButton.addEventListener('click', function() {
            let messageToPost = "gotItBtn";
            webkit.messageHandlers.gotItButtonClicked.postMessage(messageToPost);
        });
    }
}
