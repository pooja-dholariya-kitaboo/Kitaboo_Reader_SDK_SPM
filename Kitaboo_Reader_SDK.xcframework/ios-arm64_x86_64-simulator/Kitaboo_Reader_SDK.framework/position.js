var path = "";

function currentBookmarkPosition(localID) {
    path = "";
    
    var i = 0;
    var range = document.caretRangeFromPoint(0, i).cloneRange();
    
    try {
        do{
            i = i + 10;
            range = document.caretRangeFromPoint(0, i).cloneRange();
            if(range.startOffset == 1 || i == 200){
                range = document.caretRangeFromPoint(0, 0).cloneRange();
                break;
            }
        }
        while(range == undefined|| range.startOffset > 0)    }
    catch(err) {
        range = document.caretRangeFromPoint(0, 0).cloneRange();
    }
        
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(document.body);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;
    var string = JSON.stringify({
                                start: start,
                                end: start + range.toString().length
                                
                                });
    return string;
}




function getLastVisitedPagePosition() {
    var i = 0;
    var range = document.caretRangeFromPoint(0, i).cloneRange();
    try {
        do{
            i = i + 10;
            range = document.caretRangeFromPoint(0, i).cloneRange();
            if(range.startOffset == 1 || i == 200){
                range = document.caretRangeFromPoint(0, 0).cloneRange();
                break;
            }
        }
        while(range == undefined|| range.startOffset > 0)    }
    catch(err) {
        range = document.caretRangeFromPoint(0, 0).cloneRange();
    }
   
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(document.body);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;
    var string = JSON.stringify({
                                start: start,
                                end: start + range.toString().length
                                
                                });
    return string;
}

function currentPageOffset() {
    path = "";
    var i = 0;
    var range = document.caretRangeFromPoint(0, i).cloneRange();
    
    try {
        do{
            i = i + 10;
            range = document.caretRangeFromPoint(0, i).cloneRange();
            if(range.startOffset == 1 || i == 200){
                range = document.caretRangeFromPoint(0, 0).cloneRange();
                break;
            }
        }
        while(range == undefined|| range.startOffset > 0)    }
    catch(err) {
        range = document.caretRangeFromPoint(0, 0).cloneRange();
    }
    
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(document.body);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;
    var string = JSON.stringify({
                                start: start,
                                end: start + range.toString().length
                                });
    return string;
}



function getScrollPositionBeforeSettingsChange() {
    var i = 0;
    var range = document.caretRangeFromPoint(0, i).cloneRange();
    try {
        do{
            i = i + 10;
            range = document.caretRangeFromPoint(0, i).cloneRange();
            if(range.startOffset == 1 || i == 200){
                range = document.caretRangeFromPoint(0, 0).cloneRange();
                break;
            }
        }
        while(range == undefined|| range.startOffset > 0)    }
    catch(err) {
        range = document.caretRangeFromPoint(0, 0).cloneRange();
    }
        var spanElement = document.createElement("span");
    
        spanElement.id = "settingsChange";
    
        range.surroundContents(spanElement);
}



function getLastVisitedPath(ele)
{
    if(ele.parentElement === undefined || ele.parentElement.childNodes.length > 0)
    {
        for(var i = 0; i < ele.parentElement.childNodes.length ; i++)
        {
            if(ele.parentElement.childNodes[i] == ele)
            {
                path = i + "/" + path;
                if(ele.parentElement == document.body)
                {
                    return;
                }
                else
                {
                    getLastVisitedPath(ele.parentElement);
                }
            }
        }
    }
    else{
        path =  0 + "/" + path;
        if(ele.parentElement == document.body){
            return;
        }else{
            getLastVisitedPath(ele.parentElement);
        }
    }
}
