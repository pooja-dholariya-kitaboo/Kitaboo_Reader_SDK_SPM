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

/**
 * Gets the start offset of the first visible element and end offset of the last visible element in the viewport
 * @returns {string} JSON string containing the start and end offsets of visible content
 */
function getFirstAndLastElementOffsets() {
    try {
        // Get viewport dimensions
        var viewportTop = window.pageYOffset || document.documentElement.scrollTop;
        var viewportHeight = window.innerHeight;
        var viewportBottom = viewportTop + viewportHeight;
        
        // Get all text nodes in the document
        var textNodes = [];
        var walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            { acceptNode: function(node) { return node.textContent.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } },
            false
        );

        while(walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }
        
        var firstVisibleNode = null;
        var lastVisibleNode = null;
        
        // Find the first visible text node
        for (var i = 0; i < textNodes.length; i++) {
            var node = textNodes[i];
            var range = document.createRange();
            range.selectNode(node);
            var rect = range.getBoundingClientRect();
            
            // Check if the node is visible in the viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                firstVisibleNode = node;
                break;
            }
        }
        
        // Find the last visible text node
        for (var j = textNodes.length - 1; j >= 0; j--) {
            var node = textNodes[j];
            var range = document.createRange();
            range.selectNode(node);
            var rect = range.getBoundingClientRect();
            
            // Check if the node is visible in the viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                lastVisibleNode = node;
                break;
            }
        }
        
        var startOffset = 0;
        var endOffset = 0;
        
        if (firstVisibleNode) {
            // Get the first visible node's start offset
            var range = document.createRange();
            range.selectNodeContents(document.body);
            range.setEnd(firstVisibleNode, 0);
            startOffset = range.toString().length;
        }
        
        if (lastVisibleNode) {
            // Get the last visible node's end offset
            var range = document.createRange();
            range.selectNodeContents(document.body);
            try {
                // Get the parent element to ensure we're handling text nodes properly
                range.setEnd(lastVisibleNode, lastVisibleNode.length || 0);
                endOffset = range.toString().length;
            } catch (e) {
                // Fallback: Use the current offset as end
                endOffset = startOffset + 1;
            }
        }
        
        // Default to using selection-based approach if no visible nodes found
        if (!firstVisibleNode && !lastVisibleNode) {
            var i = 0;
            var range = document.caretRangeFromPoint(0, i);
            if (range) {
                range = range.cloneRange();
                
                try {
                    do {
                        i = i + 10;
                        range = document.caretRangeFromPoint(0, i);
                        if (range) {
                            range = range.cloneRange();
                        }
                        if (range && (range.startOffset == 1 || i >= viewportHeight)) {
                            range = document.caretRangeFromPoint(0, 0);
                            if (range) {
                                range = range.cloneRange();
                            }
                            break;
                        }
                    } while (range == undefined || range.startOffset > 0)
                } catch(err) {
                    range = document.caretRangeFromPoint(0, 0);
                    if (range) {
                        range = range.cloneRange();
                    }
                }
                
                if (range) {
                    var preSelectionRange = range.cloneRange();
                    preSelectionRange.selectNodeContents(document.body);
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    startOffset = preSelectionRange.toString().length;
                    endOffset = startOffset + range.toString().length;
                }
            }
        }
        
        // Return the offsets as a JSON string
        var string = JSON.stringify({
            start: startOffset,
            end: endOffset
        });
        
        return string;
    } catch (error) {
        // Return default values if an error occurs
        console.error("Error in getFirstAndLastElementOffsets:", error);
        return JSON.stringify({
            start: 0,
            end: 0
        });
    }
}
