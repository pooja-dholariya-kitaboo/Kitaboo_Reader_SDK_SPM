function addEventHandlerOnCancelButton() {
    var cancelButton = document.getElementsByClassName('cancelBtn')[0];
    if(cancelButton!=null) {
        cancelButton.addEventListener('click', function() {
            var messageToPost = "cancelBtn";
            webkit.messageHandlers.cancelButtonClicked.postMessage(messageToPost);
        });
    }

}
function addEventHandlerOnHideKeyBoardButton() {
    var cancelButton = document.getElementsByClassName('abcIcon')[0];
    if(cancelButton!=null) {
        cancelButton.addEventListener('click', function() {
            var messageToPost = "cancelBtn";
            webkit.messageHandlers.cancelButtonClicked.postMessage(messageToPost);
        });
    }
}


function addEventHandlerOnGotItButton() {
    var gotItButton = document.getElementsByClassName('gotItBtn')[0];
    if(gotItButton!=null) {
        gotItButton.addEventListener('click', function() {
            var messageToPost = "gotItBtn";
            webkit.messageHandlers.gotItButtonClicked.postMessage(messageToPost);
        });
    }
}
