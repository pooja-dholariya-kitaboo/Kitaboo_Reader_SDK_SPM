/* Document selection listener */

var searchedText = "pressure.The characteristic features of the history include:Dysphagia for solids";

var keyWords ="pressure.The characteristic features of the history include:Dysphagia";

var elements = {};

var orderedElements = [];

var completeText="";
var isRTL=false;
function setRTL(rtl)
{
    isRTL = rtl;
}
function findTextInNode(node)
{
    searchedText = searchedText.toLowerCase();
    keyWords = keyWords.toLowerCase();
    var returnedNode = examineNode(node);
    if(returnedNode)
    {
        if(returnedNode.nodeType == 3)
        {
            //create range and highlight
            var startOffSet = returnedNode.data.toLowerCase().indexOf(searchedText)+searchedText.indexOf(keyWords);
            var endOffSet = startOffSet + keyWords.length;
            var range = document.createRange();
            range.setStart(returnedNode,startOffSet);
            range.setEnd(returnedNode,endOffSet)
            //surround span
            scrollElementInToView(spanRange(range));
        }
        else
        {
            //create range from this node childs
            extractTextAndChildsFromElemnt(returnedNode);
            //text and element sare ready
            //put length of complete text in to the elements for logic
            elements[completeText.length] = returnedNode;
            //now find the index of searched string in complete text
            var beautifiedSearchText = searchedText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/\s/g, "");
            var beautifiedKeyword = keyWords.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/\s/g, "");
            var completeTextIndex = completeText.toLowerCase().indexOf(beautifiedSearchText);
            if(completeTextIndex!=-1)
            {
                completeTextIndex = completeTextIndex + beautifiedSearchText.toLowerCase().indexOf(beautifiedKeyword);
                
                var startingNode = elementThatHasIndex(elements,completeTextIndex);
                
                var endingNode = elementThatHasIndex(elements,completeTextIndex + beautifiedKeyword.length);
                
                //find out the starting and ending off sets
                
                var textBetweenStartAndEnd = "";
                
                for (var i=orderedElements.indexOf(startingNode) ; i<=orderedElements.indexOf(endingNode) ; i++)
                {
                    var currentNode = orderedElements[i];
                    
                    textBetweenStartAndEnd = textBetweenStartAndEnd + currentNode.data;
                    
                    //check for middle nodes
                    
                    if(i> orderedElements.indexOf(startingNode) && i< orderedElements.indexOf(endingNode)){
                        
                        var so = 0
                        
                        var eo = orderedElements[i].data.length;
                        
                        var range = document.createRange();
                        
                        range.setStart(orderedElements[i],so);
                        
                        range.setEnd(orderedElements[i],eo);
                        
                        spanRange(range);
                        
                    }
                }
                
                textBetweenStartAndEnd = textBetweenStartAndEnd.toLowerCase();
                
                var startNodeStartOffSet = textBetweenStartAndEnd.indexOf(keyWords.toLowerCase());
                
                if(startNodeStartOffSet == -1)
                {
                    return;
                }
                
                var startNodeEndOffSet = (keyWords.length +  startNodeStartOffSet >  startingNode.data.length) ? startingNode.data.length : keyWords.length +  startNodeStartOffSet;
                
                var startRange = document.createRange();
                
                startRange.setStart(startingNode,startNodeStartOffSet);
                
                startRange.setEnd(startingNode,startNodeEndOffSet);
                
                var nodetoscroll1 = spanRange(startRange);
                
                scrollElementInToView(nodetoscroll1);
                
                if(startingNode != endingNode)
                {
                    var endOffSetForEndNode = keyWords.length +  startNodeStartOffSet - textBetweenStartAndEnd.indexOf(endingNode.data.toLowerCase())
                    
                    var startOffSetForEndNode = 0;
                    
                    var endRange = document.createRange();
                    
                    endRange.setStart(endingNode,startOffSetForEndNode);
                    
                    endRange.setEnd(endingNode,endOffSetForEndNode);
                    
                    spanRange(endRange);
                    
                }
            }
            else
            {
                //this search does not contain any results;
                console.log("no result");
            }
        }
    }
    else
    {
        //this search does not contain any results;
        console.log("no result");
    }
}

function restorePosition(ster)
{
    if(ster.indexOf("start") < 0)
    {
        return;
    }
    var obj = JSON.parse(ster);
    
    var range3 = restoreSelection(obj);
    
    var spanElement = document.createElement("span");
    
    spanElement.id = "lastvisitedpage";
    
    range3.surroundContents(spanElement);
    var t = spanElement.offsetTop;
    
    var highlightOffSet = spanElement.offsetTop + 30;
    
    getScrollHeight();
    
    var pageNumber = (parseInt(highlightOffSet)/docHeight);
    
    var leftMargin = 0;
    
    var topMargin = 0;
    
    if(pageNumber == parseInt(highlightOffSet)/docHeight)
    {
        leftMargin = ((pageNumber)*docWidth);
    }
    else{
        
        leftMargin = ((pageNumber + 1)*docWidth);
    }
    
    if(scrollEnabled == "false")
    {
        leftMargin = 0;
        topMargin = highlightOffSet;
        return topMargin;
    }
    return leftMargin;
    
    
    //    return t.toString();
    
    //    var ele = [];
    //    ele = ster.split('/');
    //    var currentElement = document.body;
    //
    //    for(var i = 0; i < ele.length-1; i++)
    //    {
    //        if(currentElement.childNodes.length > 0 && ele[i] > 0)
    //        {
    //            var index = ele[i];
    //            if(i==0 && scrollEnabled == "true") {index = index - 1;}
    //            currentElement = currentElement.childNodes[index];
    //        }
    //    }
    //    var spanElement = document.createElement("span");
    //    var newRange = document.createRange();
    //    newRange.setStart(currentElement,ele[ele.length - 1]);
    //
    //    newRange.setEnd(currentElement,ele[ele.length - 1]);
    //    newRange.surroundContents(spanElement);
    //
    //    var topOffSet = spanElement.offsetTop;
    //
    //    var parent = spanElement.parentNode;
    //    while (spanElement.firstChild){
    //        parent.insertBefore(highlight.firstChild, highlight);
    //        parent.removeChild(highlight);
    //        parent.normalize();
    //    }
    //
    //    var highlightOffSet = topOffSet;
    //
    //    var leftOffSet = 0;
    //    getScrollHeight();
    //
    //    var pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
    //
    //    var leftMargin;// = ((pageNumber + 1)*docWidth) + leftOffSet;
    //
    //    var topMargin = 0;
    //
    //    if(pageNumber == parseInt(highlightOffSet)/docHeight)
    //    {
    //        leftMargin = ((pageNumber)*docWidth) + leftOffSet;
    //    }
    //    else{
    //        leftMargin = ((pageNumber - 1)*docWidth) + leftOffSet;
    //    }
    //
    //    if(scrollEnabled == "false")
    //    {
    //        leftMargin = 0;
    //        topMargin = highlightOffSet;
    //        return topMargin;
    //    }
    //    return leftMargin;
}


function restoreBookmarkPosition(ster)
{
    try
    {
        var topOffSet = document.getElementById(ster).offsetTop;//spanElement.offsetTop;
        
        var highlightOffSet = topOffSet;
        
        getScrollHeight();
        
        var pageNumber = (parseInt(highlightOffSet)/docHeight);
        
        var leftMargin = 0;
        
        var topMargin = 0;
        
        if(pageNumber == parseInt(highlightOffSet)/docHeight)
        {
            leftMargin = ((pageNumber)*docWidth);
        }
        else{
            if(IsTwoPageModeEnable)
            {
                leftMargin = ((pageNumber)*(docWidth/2));
            }
            else
            {
                leftMargin = ((pageNumber)*docWidth);
            }
            //leftMargin = ((pageNumber)*docWidth);
        }
        
        if(scrollEnabled == "false")
        {
            leftMargin = 0;
            topMargin = highlightOffSet;
            return topMargin;
        }
        return leftMargin;
    }
    catch(err)
    {
        
    }
}

function examineNode(node)
{
    //if node type is 3 ,check if it contains searched text
    var nodeText
    
    var beutifiedSearcgedText = searchedText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/\s/g, "");
    
    if(node.nodeType == 3)
    {
        var  neatNodeText = node.data;
        
        var index = neatNodeText.toLowerCase().indexOf(searchedText);
        
        if(index != -1)
        {
            //this text node has the searched text
            return node;
        }
        else
        {
            return null;
        }
    }
    else
    {
        var nodeText = node.innerText;
        
        if(nodeText)
        {
            //beutify the text
            
            var beautifiedNodeText = nodeText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/\s/g, "");
            
            var index = beautifiedNodeText.toLowerCase().indexOf(beutifiedSearcgedText);
            
            if(index != -1)
            {
                //this element node has the searched text,so search with in its child nodes
                
                var childNodes = node.childNodes;
                
                var requiredNode = null;
                
                for (var i=0 ; i<childNodes.length ; i++)
                {
                    var thisChildNode = childNodes[i];
                    //examin this node
                    
                    var nodeThatHasText = examineNode(thisChildNode);
                    
                    if (nodeThatHasText)
                    {
                        //this is the required node
                        requiredNode = nodeThatHasText;
                        break;
                    }
                }
                
                if(requiredNode)
                {
                    return requiredNode;
                }
                else
                {
                    //this node has text but childs do not contain text completely
                    
                    //so text is across multiple nodes
                    
                    //return the same node
                    
                    return node;
                    
                }
            }
            
            else
                
            {
                return null;
            }
            
        }
        
        else
            
        {
            //this parent has no text
            return null;
        }
        
    }
}

function spanRange(range)
{
    var spanElement = document.createElement("span");
    spanElement.id = "searchHighlightSpan";
    spanElement.setAttribute('class','searchelement');
    spanElement.style.backgroundColor = searchHighlightSpanColor;
    range.surroundContents(spanElement);
    //    spanElement.style.scale = "scale(5,5)";
    return spanElement;
}

function elementThatHasIndex(elements,index)
{
    var keys = Object.keys(elements);
    var requiredIndex;
    var z;
    for(z=0 ; z<keys.length; z++)
    {
        var currentIndex = keys[z];
        
        if ((index < currentIndex) && currentIndex != 0)
            
        {
            //this is the required index
            requiredIndex = z-1;
            break;
        }
        if(index == currentIndex)
        {
            //this is the required index
            requiredIndex = z;
            break;
        }
    }
    return elements[keys[requiredIndex]];
}



function scrollElementInToView(element)
{
    if(element.innerText.trim() == "" && element.tagName != 'img'){
        return;
    }
    var topOffSet;
    try
    {
       topOffSet =  getAbsPosition(element)[1];
    }
    catch(err)
    {
       topOffSet =  element.offsetTop;
    }
    var highlightOffSet = topOffSet;
    var leftOffSet = 0;
    getScrollHeight();
    var pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
    var leftMargin;
    var topMargin;
    if(pageNumber == parseInt(highlightOffSet)/docHeight)
    {
        if(IsTwoPageModeEnable)
            {
                leftMargin = ((pageNumber)*(docWidth/2)) + leftOffSet;
            }else{
                leftMargin = ((pageNumber)*docWidth) + leftOffSet;
            }
    }
    else
    {
        if(IsTwoPageModeEnable)
        {
            leftMargin = ((pageNumber - 1)*(docWidth/2)) + leftOffSet;
        }
        else
        {
            leftMargin = ((pageNumber - 1)*docWidth) + leftOffSet;
        }
        //leftMargin = ((pageNumber - 1)*docWidth) + leftOffSet;
    }
    if(scrollEnabled == "false")
    {
        leftMargin = 0;
        topMargin = highlightOffSet;
    }
    window.scrollTo(leftMargin, topMargin);
}







function keyForValue(value , object)

{
    
    var keys = Object.keys(elements);
    
    var requiredKey;
    
    
    
    var z;
    
    
    
    for(z=0 ; z<keys.length; z++)
        
    {
        
        if(value == object[keys[z]])
            
        {
            
            requiredKey = keys[z];
            
            break;
            
        }
        
    }
    
    
    
    return requiredKey;
    
    
    
}



function extractTextAndChildsFromElemnt(node)

{
    
    var childNodes = node.childNodes;
    
    
    
    for (var i=0 ; i<childNodes.length ; i++)
        
    {
        
        var thisChildNode = childNodes[i];
        
        //check if it is text node
        
        if(thisChildNode.nodeType ==3)
            
        {
            
            
            
            var text = thisChildNode.data;
            
            if(text)
                
            {
                
                text = text.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/\s/g, "");
                
            }else
                
            {
                
                text = "";
                
            }
            
            
            
            
            
            if((typeof text != 'undefined') && (text!="")){
                
                var trimmedText = text;
                
                var index = completeText.length;
                
                completeText = completeText+trimmedText+"";
                
                
                
                
                
                
                
                if(index == 7026)
                    
                {
                    
                    debugger;
                    
                }
                
                
                
                elements[index] = thisChildNode;
                
                orderedElements.push(thisChildNode);
                
                
                
            }
            
            
            
        }
        
        else
            
        {
            
            extractTextAndChildsFromElemnt(thisChildNode);
            
        }
        
    }
}


function onSelectionStart() {
    
    window.location = "onselectionstart:selectionstart";
}

function reloadDocumentResources(tagspath) {
    var tags = tagspath.split("_");
    for(var j = 0; j < tags.length; j++){
        var tag = tags[j];
        var imgs = document.getElementsByTagName(tag);
        for (var i = 0; i < imgs.length; i++) {
            var srcPath = imgs[i].src;
            if(srcPath != null) {
                imgs[i].src = srcPath;
            } else {
                var xSrcPath = imgs[i].getAttributeNS('http://www.w3.org/1999/xlink', 'href');
                if(xSrcPath != null) {
                    imgs[i].setAttribute('href', xSrcPath);
                }
            }
        }
    }
}
                                            
function onSelectionChange() {
    
    var selection = window.getSelection();
    
    if(selection && selection.rangeCount>0)
    {
        var range = selection.getRangeAt(0);
        if(!(range.startContainer == range.endContainer && range.startOffset == range.endOffset)){
          if(!(range.startContainer.nodeType == 1 && range.endContainer.nodeType == 1))
          {
            var rect = range.getBoundingClientRect();
            if(rect.width != 0 && rect.height != 0){
                var top = rect.top;
                var bottom = rect.bottom;
                if(top < 50  && bottom < 100)
                {
                    top = top + rect.height + 20;
                }
                else if (top < 50 && bottom > 100)
                {
                    top = bottom + 10;
                }
                else
                {
                    top = top - 100;
                }
                window.location = "onselectionchange: { \"rect\": \"{{" + rect.left + "," + top + "}, {" + rect.width + "," + rect.height + "}}\"}";
            }
                
          }
          else
          {
                removeSelectionFromText();
                window.location = "selectionCleared:";
          }
        }
        else
        {
            //removeSelectionFromText();
        }
    }
}

//@@@@@@@@@@@@
//    Returns selection range object
//    Exp: {start: 10, end: 20}
//    start: start offset of range
//    end: end offset of range
//@@@@@@@@@@@@

function getSelectionRange(){
    
    var range = window.getSelection().getRangeAt(0);
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


//@@@@@@@@@@@@
//    Returns range object based on provided start offset and end offset
//@@@@@@@@@@@@

function restoreSelection(savedSel) {
    
    var charIndex = 0, range = document.createRange();
    range.setStart(document.body, 0);
    range.collapse(true);
    var nodeStack = [document.body], node, foundStart = false, stop = false;
//    savedSel.end = savedSel.end;
    while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
            var nextCharIndex = charIndex + node.length;
            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                range.setStart(node, savedSel.start - charIndex);
                foundStart = true;
            }
            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                range.setEnd(node, savedSel.end - charIndex);
                stop = true;
            }
            charIndex = nextCharIndex;
        } else {
            var i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }
    return range;
//    var sel = window.getSelection();
//    sel.removeAllRanges();
    //    sel.addRange(range);
}


//@@@@@@@@@@@@
//    Add highlight at specified range
//@@@@@@@@@@@@

 function addHighlight(rangeOffset)
{
    var backgroundColor=rangeOffset.backgroundColor;
    var textColor=rangeOffset.textColor;
    var range = restoreSelection(rangeOffset);
    var name = rangeOffset.start+"_"+rangeOffset.end;
    var text = "";
    
    var top = document.getElementsByName(name)[0];
    if(top == undefined)
    {
    var safeRanges = getSafeRanges(range);
    for (var i = 0; i < safeRanges.length; i++)
    {
        var isVisiblerect=true;
        if(safeRanges.length>1 && i==0)
        {
            var rect = safeRanges[i].getBoundingClientRect();
            if(rect.height==0)
            {
                isVisiblerect = false;
            }
        }
        if(isVisiblerect)
        {
            text += highlightRange(safeRanges[i], name,textColor,backgroundColor);
        }
    }
    
    }
    removeSelectionFromText();
    var finalText = beautifyString(range.toString());
    return finalText;
}
                                            
function beautifyString(multiLineString) {
    var finalString = '';
    var lineArray = multiLineString.split("\n");
    for(var i=0; i<lineArray.length; i++){
        finalString += " " + lineArray[i].trim();
    }
    finalString = finalString.substring(1);
    return finalString;
}




//@@@@@@@@@@@@
//    Change Highlight Color
//@@@@@@@@@@@@

function editHighlight(name, hasNote, color,txtColor,iconFont)
{
    if(getLayout()=="FixedLayout")
    {
        editHighlightForFixedLayout(name, hasNote, color,txtColor,iconFont);
        return;
    }
    
    var highlights = document.getElementsByName(name);
    for (var i = 0; i < highlights.length; i++)
    {
        var highlight = highlights[i];
        var mycolor = hexToRgb(color,0.5);
//        highlight.setAttribute("style","background-color: "+ color +" !important;display:initial;");
        highlight.setAttribute("style", "background-color:" + mycolor + " !important;-webkit-user-select: none;-webkit-touch-callout: none;!important;display:initial;");


    }
    if(hasNote)
    {
        getScrollHeight();
        addNoteOnHighlight(name, color,txtColor,iconFont);
    }
}


//var normalHighlight = "background-color: #F4D631 !important;display:initial;";
//var importantHighlight = "background-color: #F06666 !important;display:initial;";

function editHighlightForFixedLayout(name, hasNote, color,txtColor, iconFont)
{
    var highlights = document.getElementsByName(name);
    for (var i = 0; i < highlights.length; i++)
    {
        var highlight = highlights[i];
        var mycolor = hexToRgb(color,0.5);
//        highlight.setAttribute("style","background-color: "+ color +" !important;display:initial;");

        highlight.setAttribute("style", "background-color:" + mycolor + " !important; color: inherit !important; -webkit-user-select: none;-webkit-touch-callout: none;!important;display:initial;");
    }
        if(hasNote)
        {
            addNoteOnHighlightForFixedLayout(name, color,txtColor,iconFont);
        }
}



//@@@@@@@@@@@@
//    Delete or unwrap all highlight spans having given name attribute
//@@@@@@@@@@@@

function clearHighlight(name){
    
    var highlights = document.getElementsByName(name);
    
    while(highlights.length){
        var highlight = highlights[0];
        var parent = highlight.parentNode;
        while (highlight.firstChild){
            parent.insertBefore(highlight.firstChild, highlight);
        }
        parent.removeChild(highlight);
        parent.normalize();
    }
    
    deleteHighlightAnchor(name);
    deleteNoteOnHighlight(name);
}
                                            
function clearHighlights(highlights){
    var highlightArray = highlights.split('#');
    for(var i = 0; i < highlightArray.length; i++){
        var highlight = highlightArray[i];
        clearHighlight(highlight);
    }
    return true;
}


function removeAllSearchElelemt(element) {
    if (element) {
        
        if (element.nodeType == 1) {
            if (element.getAttribute("class") == "kitaboonote") {
                
                var text = element.removeChild(element.firstChild);
                element.parentNode.insertBefore(text,element);
                element.parentNode.removeChild(element);
                return true;
            } else {
                var normalize = false;
                for (var i=element.childNodes.length-1; i>=0; i--) {
                    if (removeAllSearchElelemt(element.childNodes[i])) {
                        normalize = true;
                    }
                }
                if (normalize) {
                    alert("else");
                    
                    element.normalize();
                }
            }
        }
    }
    return false;
}


var scrollEnabled = "false";


function setScrollProperty(enabled)
{
    if(enabled == "true")
    {
        scrollEnabled = "true";
    }else
    {
        scrollEnabled = "false";
    }
}

function getScrollProperty()
{
    return scrollEnabled;
}

function loadHref(inputhref1){
    var top = document.getElementById(inputhref1);
    getScrollHeight();
    if(inputhref1.indexOf("ugc") < 0 || (top != undefined && top.tagName == "a"))
    {
        top = document.getElementById(inputhref1);
        if(top == null){
            window.scrollTo(0, 0);
            return 0;
        }
        var highlightOffSet = parseInt(top.offsetTop);
        topMargin = highlightOffSet;
        var leftOffSet = 0;
        if (readDeviceOrientationLandscape() == true && isIPAD())
        {
            pageNumber = Math.floor(parseInt(highlightOffSet)/docHeight)/2;
            if (pageNumber%1 == 0)
            {
                leftMargin = ((pageNumber)*docWidth) + leftOffSet;
            }
            else
            {
                leftMargin = ((pageNumber - 0.5)*docWidth) + leftOffSet;
            }
        }
        else
        {
            pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
            leftMargin = ((pageNumber-1)*docWidth) + leftOffSet;
        }
        if(pageNumber == parseInt(highlightOffSet)/docHeight)
        {
            leftMargin = ((pageNumber)*docWidth) + leftOffSet;
        }
        if(leftMargin < 10 && scrollEnabled == "false")
        {
            top.scrollIntoView();
            return "lop";
        }
        var topMargin = 0;
        if(scrollEnabled == "false")
        {
            leftMargin = 0;
            topMargin = highlightOffSet;
        }
        window.scrollTo(leftMargin, topMargin);
        return leftMargin;
    }
    else
    {
        inputhref1 = inputhref1.replace("ugc_", "");
        top = document.getElementsByName(inputhref1)[0];
        var highlightOffSet;
        try
        {
           var ugcPosition = getAbsPosition(top);
           highlightOffSet = parseInt(ugcPosition[1]);
        }
        catch(err)
        {
           highlightOffSet = parseInt(top.offsetTop);
        }
        topMargin = highlightOffSet;
        var leftOffSet = 5;
        var pageNumber = 0;
        var leftMargin = 0;
        if (readDeviceOrientationLandscape() == true && isIPAD())
        {
            pageNumber = Math.floor(parseInt(highlightOffSet)/docHeight)/2;
            if (pageNumber%1 == 0)
            {
                leftMargin = ((pageNumber)*docWidth) + leftOffSet;
            }
            else
            {
                leftMargin = ((pageNumber - 0.5)*docWidth) + leftOffSet;
            }
        }else
        {
            pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
            leftMargin = ((pageNumber-1)*docWidth) + leftOffSet;
        }
        if(pageNumber == parseInt(highlightOffSet)/docHeight)
        {
            leftMargin = ((pageNumber)*docWidth) + leftOffSet;
        }
        var topMargin = 0;
        if(scrollEnabled == "false")
        {
            leftMargin = 0;
            topMargin = highlightOffSet;
        }
        window.scrollTo(leftMargin, topMargin);}
        return leftMargin;
}

function readDeviceOrientationLandscape() {
    var isLandscape = false;
    if (Math.abs(window.orientation) === 90)
    {
        isLandscape = true;
    }
    return isLandscape;
}

//function loadHref(inputhref1){
//
//    var top = document.getElementById(inputhref1);
//    getScrollHeight();
//
//    if(inputhref1.indexOf("ugc") < 0 || (top != undefined && top.tagName == "a"))
//    {
////        top.scrollIntoView();
//        top = document.getElementById(inputhref1);
//
//        var highlightOffSet = parseInt(top.offsetTop);
//
//        topMargin = highlightOffSet;
//
//        var leftOffSet = 5;
//        var pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
//        var leftMargin = ((pageNumber-1)*docWidth) + leftOffSet;
//
//
//        if(pageNumber == parseInt(highlightOffSet)/docHeight)
//        {
//            leftMargin = ((pageNumber)*docWidth) + leftOffSet;
//        }
//
//        if(leftMargin < 10){
//            top.scrollIntoView();
//            return "lop";
//        }
//
//        var topMargin = 0;
//        if(scrollEnabled == "false")
//        {
//            leftMargin = 0;
//            topMargin = highlightOffSet;
//        }
//
//        window.scrollTo(leftMargin, topMargin);
//       return leftMargin;
//    }
//    else
//    {
//        inputhref1 = inputhref1.replace("ugc_", "");
//        top = document.getElementsByName(inputhref1)[0];
//
//        var highlightOffSet = parseInt(top.offsetTop);
//
//        topMargin = highlightOffSet;
//
//        var leftOffSet = 5;
//        var pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
//        var leftMargin = ((pageNumber-1)*docWidth) + leftOffSet;
//
//
//        if(pageNumber == parseInt(highlightOffSet)/docHeight)
//        {
//            leftMargin = ((pageNumber)*docWidth) + leftOffSet;
//        }
//
//        var topMargin = 0;
//        if(scrollEnabled == "false")
//        {
//            leftMargin = 0;
//            topMargin = highlightOffSet;
//        }
//
//        window.scrollTo(leftMargin, topMargin);}
//    return leftMargin;
//}


function scrollAfterSettingsChange(){
    
    var top = document.getElementById("settingsChange");
    if(top == null){
        return;
    }
    var highlightOffSet = parseInt(top.offsetTop);
    var topMargin = 0;
    var leftOffSet = 15;
    var pageNumber = Math.ceil(parseInt(highlightOffSet + 100)/docHeight);
    var leftMargin = ((pageNumber - 1)*docWidth);
    
    
    if(pageNumber == parseInt(highlightOffSet)/docHeight)
    {
        leftMargin = ((pageNumber)*docWidth);
    }
    
    if(scrollEnabled == "false")
    {
        leftMargin = 0;
        topMargin = highlightOffSet;
    }
    top.parentNode.removeChild(top);
    
    window.scrollTo(leftMargin, topMargin);
}

 function getAbsPosition(el) {
     var el2 = el;
     var curtop = 0;
     var curleft = 0;
     if (document.getElementById || document.all) {
         do {
             curleft += el.offsetLeft - el.scrollLeft;
             curtop += el.offsetTop - el.scrollTop;
             el = el.offsetParent;
             el2 = el2.parentNode;
             while (el2 != el) {
                 curleft -= el2.scrollLeft;
                 curtop -= el2.scrollTop;
                 el2 = el2.parentNode;
             }
         } while (el.offsetParent);
     } else if (document.layers) {
         curtop += el.y;
         curleft += el.x;
     }
     return [curleft,curtop];
 }

function addNoteOnHighlight(name, color,txtColor,iconFont)
{
    //alert("note"+ name);
    var highlight = document.getElementsByName(name)[0];
    var rect = document.getElementsByName(name)[0].getBoundingClientRect();
    var noteId = "note_"+name;
    var kitabooNote = document.getElementById(noteId);
    
    if(kitabooNote != null){
        // alert("start" + name);
        kitabooNote.parentNode.removeChild(kitabooNote);
        //removeAllSearchElelemt(document.body);
    }
    kitabooNote = document.createElement("kitabooNote");
    
    var dummyNote = document.createElement("dummyNote");
    dummyNote.setAttribute('id',"dummy");
    
    kitabooNote.setAttribute('id', noteId);
    kitabooNote.innerText = "u";
    kitabooNote.style.position = "absolute";
    kitabooNote.setAttribute('class','kitaboonote');
    
    kitabooNote.setAttribute('onclick', "kitabooNoteTapped(event)");
    
    var highlightTop;
    try
    {
       highlightTop =  getAbsPosition(highlight)[1];
    }
    catch(err)
    {
       highlightTop =  highlight.offsetTop;
    }
    var highlightLeft = 3;
    
    var highlightOffSet = parseInt(highlightTop);
    
    var leftOffSet = 3;
    var leftMargin ;
    var topMargin;
    var pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
    
    if(pageNumber == parseInt(highlightOffSet)/docHeight)
    {
        leftMargin = ((pageNumber)*docWidth) + leftOffSet;
        topMargin = 8;
        
    }
    else{
        if(IsTwoPageModeEnable)
        {
            leftMargin = ((pageNumber - 1)*(docWidth/2)) + leftOffSet;
        }else
        {
            leftMargin = ((pageNumber - 1)*docWidth) + leftOffSet;
        }
//        leftMargin = ((pageNumber - 1)*docWidth) + leftOffSet;
        topMargin = parseInt(highlightOffSet - ((pageNumber-1)*docHeight));
        if((topMargin + 80) >= docHeight){
            topMargin = docHeight - 80;
        }
    }
    
    if(scrollEnabled == "false")
    {
        leftMargin = leftOffSet;
        topMargin = highlightOffSet;
    }
    var mycolor = hexToRgb(color,0.85);
    kitabooNote.setAttribute('style',"text-align:center;vertical-align:middle;font-family:"+iconFont+";position: absolute;margin-left: "+highlightLeft +"px;font-size:27px;background-color:"
                             + mycolor + ";display: flex;justify-content: center; align-items: center;top:"
                             + highlightTop + "px");
    
    if(isRTL == true){
          kitabooNote.style.right = leftMargin+"px";
    }
    else{
        kitabooNote.style.left = leftMargin+"px";
    }
    kitabooNote.style.top = topMargin+"px";
    if(!isIPAD())
    {
        kitabooNote.style.height = "30px";
        kitabooNote.style.width = "30px";
        kitabooNote.style.fontSize = "20px";
    }
    else
    {
        kitabooNote.style.height = "40px";
        kitabooNote.style.width = "40px";
        kitabooNote.style.fontSize = "30px";
    }
    
    
    dummyNote.style.position = "absolute";
    dummyNote.style.left = highlightLeft-20+"px"
    dummyNote.style.top = highlightTop-20+"px"
    dummyNote.style.width = 40;
    dummyNote.style.height = 40;
    dummyNote.style.background = "red";
    
    
    document.body.appendChild(kitabooNote);
    removeClass(kitabooNote, "normalHighlight");
    removeClass(kitabooNote, "importantHighlight");
    removeClass(kitabooNote, "sharedHighlight");
    addClass(kitabooNote, color);
    //    if(color == "")
    //    {
    //        alert("done"+ name);
    //    } 
    return "{\"name\":"+kitabooNote+"}";
}


function addNoteOnHighlightForFixedLayout(name, color,txtColor,iconFont){
    //alert("note"+ name);
    var highlightRect = document.getElementsByName(name)[0].getBoundingClientRect();
    var noteId = "note_"+name;
    var kitabooNote = document.getElementById(noteId);
    
    if(kitabooNote != null)
    {
        kitabooNote.parentNode.removeChild(kitabooNote);
    }
    kitabooNote = document.createElement("kitabooNote");
    kitabooNote.setAttribute('id', noteId);
    kitabooNote.innerText = "u";//"V";
    kitabooNote.style.position = "absolute";
//    kitabooNote.setAttribute('class',"FixedEpubLayout");
    kitabooNote.setAttribute('onclick', "kitabooNoteTapped(event)");
//    var highlightTop =  highlightRect.top - getNumberFromString(document.body.style.marginTop);
    var highlightTop =  highlightRect.top;
    var highlightLeft = 5;
    
    kitabooNote.setAttribute('style',"text-align:center;vertical-align:middle;font-family:"+iconFont+";position: absolute;margin-left:"+highlightLeft+"px;font-size:27px;-webkit-user-select: none;background-color:"
                             + color
                             + ";display: flex;justify-content: center; align-items: center;top:"
                             + highlightTop + "px");

//    kitabooNote.setAttribute('style',"z-index:222;text-align:center;vertical-align:middle;font-family:kitabooread;position: absolute;margin-left:"+highlightLeft+"px;font-size:27px;background-color:"
//                             + color
//                             + ";display: block;top:"
//                             + highlightTop + "px");

    
    var scaleString = document.body.style.transform;
    var scale = parseFloat(scaleString.match(/-?\d+\.?\d*/)[0]);
    if(isRTL == true){
        kitabooNote.style.right = ((highlightLeft/scale))+"px";
    }
    else{
        kitabooNote.style.left = ((highlightLeft/scale))+"px";
    }
    var noteHeight=50;
    if(!isIPAD())
    {
        noteHeight=40;
    }
    if((highlightTop+noteHeight)>document.body.getBoundingClientRect().height)
    {
        highlightTop=highlightTop-((highlightTop+noteHeight)-document.body.getBoundingClientRect().height)
    }
    else if(highlightTop<10)
    {
        highlightTop=10;
    }
    if(currentZoomScale>1.0)
    {
        kitabooNote.style.top = ((highlightTop+window.pageYOffset)/scale)+"px";
    }
    else
    {
        kitabooNote.style.top = (highlightTop/scale)+"px";
    }
    var highestZindex = -999;
    $("*").each(function() {
                var current = parseInt($(this).css("z-index"), 0);
                if(current && highestZindex < current) highestZindex = current;
                });
    highestZindex=10;
    kitabooNote.style.zIndex = highestZindex.toString();//Need to set to any Higher number
    
    if(!isIPAD())
    {
        kitabooNote.style.height = "24px";
        kitabooNote.style.width = "25px";
        kitabooNote.style.fontSize = "20px";
        kitabooNote.style.paddingTop = "3px"
    }
    else
    {
        kitabooNote.style.height = "38px";
        kitabooNote.style.width = "40px";
        kitabooNote.style.fontSize = "30px";
        kitabooNote.style.paddingTop = "5px"
    }
    
    document.body.appendChild(kitabooNote);
    
    var fetchedKitabooNote = document.getElementById(noteId);
    var transformValue;
    if(scale>0)
    {
        transformValue=(scale-1)/scale;
        transformValue=1-transformValue;
    }
    else
    {
        transformValue=(1-scale)/scale;
        transformValue=scale+transformValue;
    }
    fetchedKitabooNote.style.transform="scale("+transformValue+")";
    kitabooNote.style.visibility = "visible";
    
    return "{\"name\":"+kitabooNote+"}";
}

function getNumberFromString(string)
{
    return parseFloat(string.match(/-?\d+\.?\d*/)[0]);
}

function isIPAD()
{
    var iPad = (((navigator.userAgent.match(/iPad/i)) || ((navigator.platform === 'MacIntel') && (navigator.maxTouchPoints > 1))) != false);
    return iPad;
}


//@@@@@@@@@@@@
//    Delete note on page
//@@@@@@@@@@@@

function deleteNoteOnHighlight(name){
    
    var noteId = "note_"+name;
    var kitabooNote = document.getElementById(noteId);
    if (kitabooNote != null){
        kitabooNote.parentNode.removeChild(kitabooNote);
    }
}

//@@@@@@@@@@@@
//    Add UGC anchor
//@@@@@@@@@@@@

function addHighlightAnchor(name){
    
    var highlight = document.getElementsByName(name)[0];
    var anchorId = "ugc_"+name;
    var anchor = document.getElementById(anchorId);
    
    if(anchor == null){
        anchor = document.createElement("a");
        anchor.setAttribute("id", anchorId);
        anchor.setAttribute("name", anchorId);
        anchor.setAttribute("style", "background: transparent;padding: 0;margin: 0;color: transparent;");
        highlight.parentNode.insertBefore(anchor, highlight);
    }
}
//@@@@@@@@@@@@
//    Delete UGC Anchor
//@@@@@@@@@@@@

function deleteHighlightAnchor(name){
    
    var anchorId = "ugc_"+name;
    var anchor = document.getElementById(anchorId);
    
    if (anchor != null){
        anchor.parentNode.removeChild(anchor);
    }
}

//@@@@@@@@@@@@
//    Start highlighting range
//@@@@@@@@@@@@

function highlightRange(range, name,textColor,backgroundColor)
{
    var newNode = document.createElement("highlightmark");
    newNode.setAttribute("name", name);
    var mycolor = hexToRgb(backgroundColor,0.5);
    newNode.setAttribute('onclick', "kitabooHighlightTapped(event)");
    newNode.setAttribute("style", "background-color:" + mycolor + " !important;-webkit-user-select: none;-webkit-touch-callout: none;");
    if(range.toString().trim().length>0)
    {
        range.surroundContents(newNode);
    }
    else
    {
        return " ";
    }
    return newNode.innerText;
}

function hexToRgb(hex, alpha) {
    hex   = hex.replace('#', '');
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    if ( alpha ) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
}



function getHighlightText() {
    var range = window.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    var finalText = beautifyString(preSelectionRange.toString());
    return finalText;
}


var docWidth;
var docHeight;

function getScrollHeight() {
    
    var width = window.innerWidth;
    docWidth  = window.innerWidth;
    docHeight = window.innerHeight;
    
    return width;
}

function getScrollWidth(){
    
    var width = document.documentElement.clientWidth;
    return width;
}

function updateAllsticksForFixedLayout()
{
    var notes = document.getElementsByTagName("kitabooNote");
    for(var i=0;i<notes.length;i++)
    {
        
        var j = notes.length;
        var id = notes[i].id;
        //find first element from highlights
        var name = id.split("_")[1];
        var requiredName = name+"_"+id.split("_")[2];
        var highlight = document.getElementsByName(requiredName)[0];
        var highlightRect = document.getElementsByName(requiredName)[0].getBoundingClientRect();
//        var highlightTop = highlightRect.top-getNumberFromString(document.body.style.marginTop);
        var highlightTop = highlightRect.top;

        var highlightLeft = "5";
        
        var scaleString = document.body.style.transform;
        var scale = parseFloat(scaleString.match(/-?\d+\.?\d*/)[0]);
        if(isRTL == true){
            notes[i].style.right = (highlightLeft/scale)+"px";
        }
        else{
            notes[i].style.left = (highlightLeft/scale)+"px";
        }
        var noteHeight=50;
        
        if(!isIPAD())
        {
            noteHeight=40;
        }
        
        if((highlightTop+noteHeight)>document.body.getBoundingClientRect().height)
        {
            highlightTop=highlightTop-((highlightTop+noteHeight)-document.body.getBoundingClientRect().height)
        }
        else if(highlightTop<10)
        {
            highlightTop=10;
        }
        
        var transformValue;
        if(scale>0)
        {
            transformValue=(scale-1)/scale;
            transformValue=1-transformValue;
        }
        else
        {
            transformValue=(1-scale)/scale;
            transformValue=scale+transformValue;
        }
        notes[i].style.transform="scale("+transformValue+")";
        notes[i].style.top = (highlightTop/scale)+"px";
    }
}
                                    
function updateAllsticks()
{
    setTimeout(function() { updateAllsticksIcon(); }, 100);
}


function updateAllsticksIcon()
{
    
    if(getLayout()=="FixedLayout")
    {
        updateAllsticksForFixedLayout()
        return;
    }
    
    var notes = document.getElementsByTagName("kitabooNote");
    var leftOffset = 5;
    
    for(var i=0;i<notes.length;i++)
    {
        var j = notes.length;
        
        var id = notes[i].id;
        //find first element from highlights
        var name = id.split("_")[1];
        var requiredName = name+"_"+id.split("_")[2];
        var highlight = document.getElementsByName(requiredName)[0];
        var highlightTop;
        try
        {
           highlightTop =  getAbsPosition(highlight)[1];
        }
        catch(err)
        {
           highlightTop =  highlight.offsetTop;
        }
        var highlightLeft = "5";
        
        var highlightOffSet = parseInt(highlightTop);
        
        var leftOffSet = 5;
        var leftMargin ;
        var topMargin;
        var pageNumber = Math.ceil(parseInt(highlightOffSet)/(window.innerHeight));
        
        if(pageNumber == parseInt(highlightOffSet)/(window.innerHeight))
        {
            leftMargin = ((pageNumber)*(window.innerWidth)) + leftOffSet;
            topMargin = 8;
        }
        else{
            if(IsTwoPageModeEnable)
            {
                leftMargin = ((pageNumber - 1)*(window.innerWidth/2)) + leftOffSet;
            }else
            {
                leftMargin = ((pageNumber - 1)*window.innerWidth) + leftOffSet;
            }
            topMargin = parseInt(highlightOffSet - ((pageNumber-1)*(window.innerHeight)));
            if((topMargin + 80) >= (window.innerHeight)){
                topMargin = (window.innerHeight) - 80;
            }
        }
        
        if(scrollEnabled == "false")
        {
            leftMargin = leftOffSet;
            topMargin = highlightOffSet;
        }
        
        if(isRTL == true){
           notes[i].style.right = leftMargin+"px";
        }
        else{
            notes[i].style.left = leftMargin+"px";
        }
        notes[i].style.top = topMargin+"px";
    }
}


function updateAllsticks1(event)
{
    document.body.removeAttribute('onselectionchange');
}


function updateAllsticks2(event)
{
    document.body.setAttribute('onselectionchange',"onSelectionChange()");
    setTimeout(function() { slowAlert(); }, 150);
}

function slowAlert()
{
    window.location = "onclearselection:onclearselection";
}


//@@@@@@@@@@@@
//    Returns an array of range objects obtained from range object
//@@@@@@@@@@@@

function getSafeRanges(range) {
    
    var commonAncestorContainer = range.commonAncestorContainer;
    var startContainer = range.startContainer;
    var endContainer = range.endContainer;
    
    var startArray = new Array(0), startRange = new Array(0);
    var endArray = new Array(0), endRange = new Array(0);
    
    // @@@@@ If start container and end container is same
    if(startContainer == endContainer){
        return [range];
    } else {
        
        for(var i = startContainer; i != commonAncestorContainer; i = i.parentNode){
            startArray.push(i);
        }
        
        for(var i = endContainer; i != commonAncestorContainer; i = i.parentNode){
            endArray.push(i);
        }
    }
    
    if (0 < startArray.length){
        
        for(var i = 0; i < startArray.length; i++) {
            
            if (i) {
                
                var node = startArray[i-1];
                while((node = node.nextSibling) != null){
                    startRange = startRange.concat(getRangeOfChildNodes(node));
                }
            }else{
                
                var xs = document.createRange();
                var s = startArray[i];
                var offset = range.startOffset;
                var ea = (startArray[i].nodeType == Node.TEXT_NODE)
                ? startArray[i] : startArray[i].lastChild;
                xs.setStart(s, offset);
                xs.setEndAfter(ea);
                startRange.push(xs);
            }
        }
    }
    
    if (0 < endArray.length){
        
        for(var i = 0; i < endArray.length; i++) {
            
            if (i) {
                
                var node = endArray[i-1];
                while((node = node.previousSibling) != null){
                    endRange = endRange.concat(getRangeOfChildNodes(node));
                }
                
            }else{
                var xe = document.createRange();
                var sb = (endArray[i].nodeType == Node.TEXT_NODE) ? endArray[i] : endArray[i].firstChild;
                
                var end = endArray[i];
                var offset = range.endOffset;
                xe.setStartBefore(sb);
                xe.setEnd(end, offset);
                endRange.unshift(xe);
            }
        }
    }
    
    var topStartNode = startArray[startArray.length - 1];
    var topEndNode = endArray[endArray.length - 1];
    
    var middleRange = getRangeOfMiddleElements(topStartNode, topEndNode);
    
    startRange = startRange.concat(middleRange);
    response = startRange.concat(endRange);
    
    return response;
}

function getRangeOfMiddleElements(topStartNode, topEndNode){
    
    var rangeArray = new Array(0);
    
    for (var i = topStartNode.nextSibling; i != topEndNode; i = i.nextSibling){
        
        rangeArray = rangeArray.concat(getRangeOfChildNodes(i));
    }
    
    return rangeArray;
}

function getRangeOfChildNodes(node){
    
    var rangeArray = new Array(0);
    
    if (node.nodeType == Node.TEXT_NODE){
        
        var xm = document.createRange();
        xm.setStartBefore(node);
        xm.setEndAfter(node);
        rangeArray.push(xm);
        
    } else {
        
        for (var i = 0; i < node.childNodes.length; i++){
            var childNode = node.childNodes[i];
            rangeArray = rangeArray.concat(getRangeOfChildNodes(childNode));
        }
    }
    
    return rangeArray;
}

//@@@@@@@@@@@@
//    On click events for note and highlight tap
//@@@@@@@@@@@@

function kitabooNoteTapped(event){
    
    event.stopPropagation();
    var kitabooNote = event.target;
    var json = {name: kitabooNote.id};
    window.location = "note:"+JSON.stringify(json);
}

function kitabooHighlightTapped(event){
              if(!_isTTSPlay){
                event.stopPropagation();
                var kitabooHighlight = event.target;
                if (!hasClass(kitabooHighlight, "blueColor")){
                  var json = {name: kitabooHighlight.getAttribute("name")};
                  window.location = "highlight:"+JSON.stringify(json);
                }
              }
}

//@@@@@@@@@@@
//  Search highlight methods
//@@@@@@@@@@@

var TRange=null;
var searchedString="";
var searchHighlightSpanColor="";

function findString (str,allpara,color) {
    removeSearchSpan();
    searchedText = allpara;
    searchHighlightSpanColor = color;
    keyWords = str;
    getScrollHeight();
    findTextInNode(document.body);
}

function findStringForFixed(str,color) {
    removeSearchSpan();
    keyWords = str;
    getScrollHeight();
    highlightdoc(document.body,str,'searchelement',color);
}

function isInViewRect(elem) {
    var bounding = elem.getBoundingClientRect();
    if(bounding.bottom == 0)
    {
        return false;
    }
    return ( bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) );
    
}

function highlightTextByIndex(indx,color,searchColor)
{
    var CurrIndx=parseInt(indx);
    var defaultColor = searchColor;
    var highlights = document.getElementsByClassName("searchelement");
    if(highlights.length)
    {
        for(i=0;i<highlights.length;i++){
            var currentElement = highlights[i];
            if(currentElement)
            {
                if(i==indx)
                {
                    currentElement.style.backgroundColor = color;
                    var isElemInView =isInViewRect(currentElement);
                    if(!isElemInView){
                        scrollElementInToView(currentElement);
                    }
                }
                else
                {
                    currentElement.style.backgroundColor = defaultColor;
                }
            }
        }
    }
}

function getSearchHighlightedWordCount()
{
    var highlights = document.getElementsByClassName("searchelement");
    return highlights.length;
}

function highlightdoc(container,searchedWord,spanClass,color) {
//    var content = container.innerHTML;
//    var pattern = new RegExp(searchedWord,'ig');
//    var replaceWith = '<span style="background-color:'+ color +'" class="searchelement">'+ searchedWord +'</span>';
//    var highlighted = content.replace(pattern,replaceWith);
//    try{
//        container.innerHTML = highlighted;
//    }
//    catch (ex){
//
//    }
    //if(container.innerHTML === content) {
    var wordLocations = getLocationsForString(searchedWord.toLowerCase(),document.body.textContent.toLowerCase());
    for(var i =0; i < wordLocations.length ; i++)
    {
        var startIndex = wordLocations[i];
        var endIndex = startIndex + searchedWord.length;
        var jsonString = {start: startIndex,
                    end: endIndex,
                    textColor:color,
                    backgroundColor:color
                    };
        addSearchHighlight(jsonString);
    }
    //}
}
                                                
function getLocationsForString(substring,string)
{
    var a=[],i=-1;
    while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
    return a;
}
                                                
function addSearchHighlight(rangeOffset)
{
    var backgroundColor=rangeOffset.backgroundColor;
    var textColor=rangeOffset.textColor;
    var range = restoreSelection(rangeOffset);
    var name = rangeOffset.start+"_"+rangeOffset.end;
    var text = "";
    
    var top = document.getElementsByName(name)[0];
    if(top == undefined)
    {
        var safeRanges = getSafeRanges(range);
        for (var i = 0; i < safeRanges.length; i++)
        {
            var isVisiblerect=true;
            if(safeRanges.length>1 && i==0)
            {
                var rect = safeRanges[i].getBoundingClientRect();
                if(rect.height==0)
                {
                    isVisiblerect = false;
                }
            }
            if(isVisiblerect)
            {
                text += highlightSearchRange(safeRanges[i], name,textColor,backgroundColor);
            }
        }
    }
}
                                                
function highlightSearchRange(range, name,textColor,backgroundColor)
{
    var newNode = document.createElement("SearchSpan");
    var mycolor = hexToRgb(backgroundColor,0.5);
    newNode.setAttribute("style", "background-color:" + mycolor + " !important;-webkit-user-select: none;-webkit-touch-callout: none;");
    newNode.setAttribute('class','searchelement');
    if(range.toString().trim().length>0)
    {
        range.surroundContents(newNode);
    }
    else
    {
        return " ";
    }
    return newNode.innerText;
}


function cleareSearchHighlightSelection(){
    
    //removeAllSearchElelemt(document.body);
    
    removeSearchSpan();
    
}

function getSearchelement()
{
    var ele = document.createElement('span');
    ele.setAttribute('class','searchelement');
    return ele;
}

function cleareSelection()
{
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

function surroundSelection(keyword) {
    //alert(keyword);
    if (document.getSelection) {
        var sel =  window.getSelection();
        //alert(sel.rangeCount);
        if (sel.rangeCount) {
            //            alert("hi hi hi ");
            var range = window.getSelection().getRangeAt(0);
            //alert(range.rangeCount);
            var saferanges = getSafeRanges(range);
            
            var text = "";
            for (var i = 0; i < saferanges.length; i++) {
                //text += highlightRange(saferanges[i], "rand");
                var newNode = document.createElement("span");
                //newNode.setAttribute("class", "searchhighlight");
                saferanges[i].surroundContents(newNode);
                //console.log('html :'+newNode.innerHTML);
                //alert(saferanges[i]);
                newNode.innerHTML = newNode.innerHTML.toLowerCase().replace(keyword.toLowerCase(),'<span class="searchhighlight">'+keyword+'</span>');
            }
            //            cleareSelection();
            
        }
    }
}
function removeAllSearchElelemt(element) {
    if (element) {
        if (element.nodeType == 1) {
            if (element.getAttribute("class") == "searchelement") {
                var text = element.removeChild(element.firstChild);
                element.parentNode.insertBefore(text,element);
                element.parentNode.removeChild(element);
                return true;
            } else {
                var normalize = false;
                for (var i=element.childNodes.length-1; i>=0; i--) {
                    if (removeAllSearchElelemt(element.childNodes[i])) {
                        normalize = true;
                    }
                }
                if (normalize) {
                    element.normalize();
                }
            }
        }
    }
    return false;
}


function highlightSearch(element,keyword)
{
    if (element)
    {
        if (element.nodeType == 3)
        {        // Text node
            while (true)
            {
                //if (counter < 1) {
                var value = element.nodeValue;  // Search for keyword in text node
                var idx = value.toLowerCase().indexOf(keyword);
                
                if (idx < 0) break;             // not found, abort
                
                var span = document.createElement("span");
                var text = document.createTextNode(value.substr(idx,keyword.length));
                span.appendChild(text);
                span.setAttribute("class","searchhighlight");
                text = document.createTextNode(value.substr(idx+keyword.length));
                element.deleteData(idx,value.length-idx);
                var next = element.nextSibling;
                element.parentNode.insertBefore(span,next);
                element.parentNode.insertBefore(text,next);
                element = text;
                //                span.scrollIntoView();
                
            }
        } else if (element.nodeType == 1) { // Element node
            if (element.style.display != "none" && element.nodeName.toLowerCase() != 'select') {
                for (var i=element.childNodes.length-1; i>=0; i--) {
                    highlightSearch(element.childNodes[i],keyword);
                }
            }
        }
    }
}



window.onresize = function() {
    
    setTimeout(function() {
               
               docWidth = window.innerWidth;
               docHeight = window.innerHeight;
               updateAllsticks(); }, 100);
};



function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag)
{
    
    // the highlightStartTag and highlightEndTag parameters are optional
    
    if ((!highlightStartTag) || (!highlightEndTag)) {
        
        highlightStartTag = "<font style='color:blue; background-color:yellow;' class='searchelement'>";
        
        highlightEndTag = "</font>";
        
    }
    
    // find all occurences of the search term in the given text,
    
    // and add some "highlight" tags to them (we're not using a
    
    // regular expression search, because we want to filter out
    
    // matches that occur within HTML tags and script blocks, so
    
    // we have to do a little extra validation)
    
    var newText = "";
    
    var i = -1;
    
    var lcSearchTerm = searchTerm.toLowerCase();
    
    var lcBodyText = bodyText.toLowerCase();
    
    while (bodyText.length > 0) {
        
        i = lcBodyText.indexOf(lcSearchTerm, i+1);
        
        if (i < 0) {
            
            newText += bodyText;
            
            bodyText = "";
            
        } else {
            
            // skip anything inside an HTML tag
            
            if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
                
                // skip anything inside a <script> block
                
                if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
                    
                    newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
                    
                    bodyText = bodyText.substr(i + searchTerm.length);
                    
                    lcBodyText = bodyText.toLowerCase();
                    
                    i = -1;
                    
                }
                
            }
            
        }
        
    }
    return newText;
}

function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)

{
    
    // if the treatAsPhrase parameter is true, then we should search for
    
    // the entire phrase that was entered; otherwise, we will split the
    
    // search string so that each word is searched for and highlighted
    
    // individually
    
    if (treatAsPhrase) {
        
        searchArray = [searchText];
        
    } else {
        
        searchArray = searchText.split(" ");
        
    }
    
    if (!document.body || typeof(document.body.innerHTML) == "undefined") {
        
        if (warnOnFailure) {
            
            alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
            
        }
        
        return false;
        
    }
    
    var bodyText = document.body.innerHTML;
    
    for (var i = 0; i < searchArray.length; i++) {
        
        bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
        
    }
    
    document.body.innerHTML = bodyText;
    
    return true;
    
}

function searchPrompt(defaultText, treatAsPhrase, textColor, bgColor)

{
    
    // This function prompts the user for any words that should
    
    // be highlighted on this web page
    
    if (!defaultText) {
        
        defaultText = "";
        
    }
    
    // we can optionally use our own highlight tag values
    
    if ((!textColor) || (!bgColor)) {
        
        highlightStartTag = "";
        
        highlightEndTag = "";
        
    } else {
        
        highlightStartTag = "<font style='color:" + textColor + "; background-color:" + bgColor + ";'>";
        
        highlightEndTag = "</font>";
        
    }
    
    
    
    if (treatAsPhrase) {
        
        promptText = "Please enter the phrase you'd like to search for:";
        
    } else {
        
        promptText = "Please enter the words you'd like to search for, separated by spaces:";
        
    }
    
    searchText = prompt(promptText, defaultText);
    
    if (!searchText)  {
        
        alert("No search terms were entered. Exiting function.");
        
        return false;
        
    }
    
    return highlightSearchTerms(searchText, treatAsPhrase, true, highlightStartTag, highlightEndTag);
    
}

function getElementContainingText(searchedText)
{
    //var searchedText = "others as your own; cheating. On occasion, a graduate student or faculty member";
    
    var newElement = classicSearch(searchedText);
    if(!newElement)
    {
        //user our logic
        var element = myFunction(searchedText,document.children[0].children);
        if(element)
        {
            //highlightElementForText(element,searchedText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,''));
            //element.scrollIntoView();
            //console.log(element);
        }
    }
}

function myFunction(searchedText,allElements){
    var i;
    var completeText = "";
    
    var elements = {};
    
    
    
    //console.log("script started");
    var children = allElements;
    var j ;
    
    
    for(j=0 ; j<children.length ; j++ ){
        var currentChild = children[j];
        var text = currentChild.innerText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/ /g,'');
        
        if((typeof text != 'undefined') && (text!="")){
            //console.log("printing the out put");
            var trimmedText = text;
            completeText = completeText+trimmedText+"";
            //console.log(text);
            
            var index = completeText.indexOf(trimmedText);
            
            elements[index] = currentChild;
            
        }
        //}
    }
    
    console.log("script ended");
    console.log(completeText);
    completeText = completeText.toLowerCase();
    
    if(completeText.length == 0)
    {
        //the childs have no text
        //return the parent as required element
        return allElements[0].parentElement;
    }
    
    var stringToSearch = searchedText.toLowerCase();
    var minifiedStringToSearch = stringToSearch.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/ /g,'');
    
    var index = completeText.indexOf(minifiedStringToSearch);
    if(index == -1)
    {
        return null;
    }else
    {
        var keys = Object.keys(elements);
        keys.push(completeText.length);
        var requiredIndex;
        
        var z;
        
        for(z=0 ; z<keys.length; z++)
        {
            var currentIndex = keys[z];
            if ((index <= currentIndex) && (index+minifiedStringToSearch.length > currentIndex) && currentIndex != 0)
            {
                //the text lies accross elements
                //so find the start and end elements separatly
                //                var textForStart = minifiedStringToSearch.substring(0,(minifiedStringToSearch.length - (minifiedStringToSearch.length+index - currentIndex)));
                //                var elementForStart = elements[keys[z-1]];
                //                var startElement;
                //                if(elementForStart.children.length > 0)
                //                {
                //                    startElement = myFunction(textForStart,elementForStart.children);
                //                }
                //                else
                //                {
                //                    startElement = elementForStart;
                //                }
                //
                //                var textForEnd = minifiedStringToSearch.substring(textForStart.length,minifiedStringToSearch.length);
                //                var elementForEnd = elements[keys[z]];
                //                var endElement;
                //                if(elementForEnd.children.length > 0)
                //                {
                //                    endElement = myFunction(textForEnd,elementForEnd.children);
                //                }
                //                else
                //                {
                //                    endElement = elementForEnd;
                //                }
                //
                //                console.log(startElement+" "+endElement);
                //                //highlight end element
                //                highlightElementForText(endElement,textForEnd.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,''));
                //                highlightElementForText(startElement,textForStart.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,''));
                //
                //
                //                return startElement;
                return null;
                
            }
            
            
            if (index <= currentIndex) {
                if(index==0)
                {
                    requiredIndex = keys[z];
                }else
                {
                    requiredIndex = keys[z-1];
                }
                
                
                
                break;
            }
            
        }
        
        var elementThatContainsText = elements[requiredIndex];
        console.log("the required index is ; "+elements[requiredIndex]);
        
        if(elementThatContainsText.children.length > 0)
        {
            //find which exact child has text
            var nextLevelElement = myFunction(stringToSearch,elementThatContainsText.children);
            //if a element has childs but no child has the exact match then text is spaned between two elements
            //so return the element that has the starting of the searched text
            if(nextLevelElement)
            {
                return nextLevelElement;
            }
            else
            {
                //find the fist node that has match from searched text
                return findTextMatchInElements(stringToSearch,elementThatContainsText.children);
            }
        }else
        {
            return elementThatContainsText;
        }
        
    }
    
}


function classicSearch(searchedText)
{
    var newElement = window.find(searchedText);
    if(newElement)
    {
        //navigate to page
        //get the element to scroll to
        //removeSearchSpan();
        
        var keyWord = searchedString;
        
        var selectedRange = window.getSelection().getRangeAt(0);
        var textElement = selectedRange.startContainer.parentElement;
        
        var startOffsetToGive = selectedRange.startOffset + searchedText.indexOf(keyWord);
        var endOffsetToGive = startOffsetToGive+keyWord.length;
        
        var spanElement = document.createElement("span");
        spanElement.style.background = "MediumPurple";
        spanElement.id = "searchHighlightSpan";
        
        var newRange = document.createRange();
        newRange.setStart(selectedRange.startContainer,startOffsetToGive);
        
        newRange.setEnd(selectedRange.endContainer,endOffsetToGive);
        newRange.surroundContents(spanElement)
        
        
        var topOffSet = spanElement.offsetTop;
        
        var highlightOffSet = topOffSet;
        //    alert("top  " + highlightOffSet + "id  "+ inputhref1);
        
        
        var docWidth = window.innerWidth;
        var docHeight = window.innerHeight;
        var leftOffSet = 0;
        var pageNumber = Math.ceil(parseInt(highlightOffSet)/docHeight);
        var leftMargin = ((pageNumber-1)*docWidth) + leftOffSet;
        
        var topMargin = 0;
        
        if(scrollEnabled == "false")
        {
            leftMargin = 0;
            topMargin = highlightOffSet-100;
        }
        
        window.scrollTo(leftMargin, topMargin);
        
        
        
        //remove selection
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
        
    }
    return newElement;
}


function removeSearchSpan()
{
    var highlights = document.getElementsByClassName("searchelement");
    var searchLength=highlights.length;
    elements = {};
    orderedElements = [];
    completeText = "";
    for(var i =0; i < searchLength ; i++)
    {
        var highlight = highlights[0];
        var parent = highlight.parentNode;
        while (highlight.firstChild){
            parent.insertBefore(highlight.firstChild, highlight);
            parent.removeChild(highlight);
            parent.normalize();
        }
    }
}

function getSelectedNode()
{
    if (document.selection)
        return document.selection.createRange().parentElement();
    else
    {
        var selection = window.getSelection();
        if (selection.rangeCount > 0)
            return selection.getRangeAt(0).startContainer.parentNode;
    }
}


function findTextMatchInElements(searchedText,elements)
{
    var i;
    var requiredElements = {};
    var requiredElement;
    
    var remaingSearchText="";
    
    
    for(i=0 ; i<elements.length ; i++)
    {
        var currentElement = elements[i];
        var components = searchedText.split(" ");
        var index = currentElement.innerText.indexOf(components[0]);
        //see whether this element last text is entirly contained in searched text
        var elementCompleteText = currentElement.innerText;
        var lastText = elementCompleteText.substring(index, elementCompleteText.length);
        var minifiedSearchText = searchedText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/ /g,'');
        var minifiedLastText = lastText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'').replace(/ /g,'');
        
        var finalIndex = minifiedSearchText.indexOf(minifiedLastText);
        if(finalIndex != -1)
        {
            //this is the required first element
            requiredElement = currentElement
            //also highlight the  element
            classicSearch(lastText);
            
            remaingSearchText = searchedText.replace(lastText,"").trim();
            
            
            
            
            
            
            break;
        }
        
        
        
        
    }
    
    if(requiredElement){
        
        //now check for second element
        
        //as we got the first element extract the found string from the original string and search
        
        
        //avoid searching if it is first element
        if(!remaingSearchText=="")
        {
            var newElement = classicSearch(remaingSearchText);
            if(!newElement)
            {
                //user our logic
                var element = myFunction(searchedText,document.children[0].children);
                if(element)
                {
                    //highlightElementForText(element,searchedText.trim().replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,''));
                    //element.scrollIntoView();
                    //console.log(element);
                }
                
            }
            
        }
        
    }
    else
    {
        requiredElement = elements[0].parentElement;
    }
    
    
    return requiredElement;
    
}


function highlightElementForText(element,text)
{
    //if element has childs surround them as well
    
    var innerText = element.innerHTML.trim();//replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,'');
    var components = text.split(" ");
    for (var h=0 ; h<components.length ; h++)
    {
        var text = "<span style='background:yellow'>"+components[h]+"</span>";
        innerText = innerText.replace(components[h],text);
    }
    element.innerHTML = innerText;
    //window.location = innerText;
    //alert (innerText);
    //element.style.background = "blue";
    //var startIndex = elementHTML.indexOf(text);
}

function makeEditableAndHighlight(colour) {
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
    
}

function highlight(colour) {
    var range, sel;
    if (window.getSelection) {
        // IE9 and non-IE
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (document.selection && document.selection.createRange) {
        // IE <= 8 case
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    }
    //document.cleareSelection();
    //removeSelection();
}

function addBookmark(ster,localID)
{
    var currentElement = document.getElementById(localID);
    
    if(currentElement != undefined || ster.indexOf("start") < 0)
    {
        return;
    }
    var obj = JSON.parse(ster);
    
    var range3 = restoreSelection(obj);
    
    var spanElement = document.createElement("span");
    
    spanElement.id = localID;
    
    range3.surroundContents(spanElement);
    var t =spanElement.offsetTop;
    return t.toString();
}

function isContextBookmarked(localID)
{
    var currentElement = document.getElementById(localID);
   try{
    var rect = currentElement.getBoundingClientRect(), top = rect.top, height = rect.height;
    var value =  currentElement.offsetTop;
    var minValue = window.pageYOffset == 0 ? window.pageXOffset: window.pageYOffset;
    var maxValue = minValue + window.innerHeight;
    
    if(scrollEnabled == "true")
    {
        var t = minValue/window.innerWidth;
        minValue = t * window.innerHeight;
        maxValue = minValue + window.innerHeight;
        value = value + 20;
    }
    if(value >= minValue && value < maxValue)
    {
        return true;
    }
    else{
        return false;
    }
   }
   catch(err){
       if(window.pageXOffset == 0 && window.pageYOffset == 0)
       {
           return true;
       }
       else
       {
           return false;
       }
   }
}

function stopAudioVideo() {
    var audioPlayer = document.getElementsByTagName('audio')[0];
    if (audioPlayer != undefined) {
        audioPlayer.pause();
    }
    var videoPlayer = document.getElementsByTagName('video')[0];
    if (videoPlayer != undefined) {
        videoPlayer.pause();
    }
}

function removeSelectionFromText() {
    window.getSelection().removeAllRanges()
}
                                   
function checkIfTappedOnNoteOrHighlight(leftValue,topValue){
    var tapLimitOffset = 30;
    var noteElements = document.getElementsByTagName("kitabooNote");
    for(var i = 0; i < noteElements.length; i++){
        var noteElement = noteElements[i];
        var rect = noteElement.getBoundingClientRect();
        var noteLeft = rect.left + window.scrollX - (tapLimitOffset / 2);
        var noteTop = rect.top + window.scrollY - (tapLimitOffset / 2);
        var noteRight = noteLeft + rect.width + tapLimitOffset;
        var noteBottom = noteTop + rect.height + tapLimitOffset;
        if(leftValue >= noteLeft && leftValue <= noteRight && topValue >= noteTop && topValue <= noteBottom){
            return true;
        }
    }
    return false;
}
function checkIfTappedOnSentence(leftValue,topValue){
        var tapLimitOffset = 30;
        var noteElements = document.getElementsByClassName("sentence");
        for(var i = 0; i < noteElements.length; i++){
            var noteElement = noteElements[i];
            var rect = noteElement.getBoundingClientRect();
            var noteLeft = rect.left + window.scrollX - (tapLimitOffset / 2);
            var noteTop = rect.top + window.scrollY - (tapLimitOffset / 2);
            var noteRight = noteLeft + rect.width + tapLimitOffset;
            var noteBottom = noteTop + rect.height + tapLimitOffset;
            if(leftValue >= noteLeft && leftValue <= noteRight && topValue >= noteTop && topValue <= noteBottom){
                return true;
            }
        }
        return false;
}
function checkIfTappedOnSentenceForFixedEpub(leftValue,topValue){
    var tapLimitOffset = 30;
    var noteElements = document.getElementsByClassName("ttsSentence");
    for(var i = 0; i < noteElements.length; i++){
        var noteElement = noteElements[i];
        var rect = noteElement.getBoundingClientRect();
        var noteLeft = rect.left + window.scrollX - (tapLimitOffset / 2);
        var noteTop = rect.top + window.scrollY - (tapLimitOffset / 2);
        var noteRight = noteLeft + rect.width + tapLimitOffset;
        var noteBottom = noteTop + rect.height + tapLimitOffset;
        if(leftValue >= noteLeft && leftValue <= noteRight && topValue >= noteTop && topValue <= noteBottom){
            return true;
        }
    }
    return false;
}
                                                           
function highlightWordByWordId(wordId,color)
{
    var highlightedWords = document.getElementsByClassName("audiosyncHighlightClass");
    for(var i = 0; i < highlightedWords.length; i++){
        var highlightedWord = highlightedWords[i];
        if(highlightedWord){
            highlightedWord.style.backgroundColor = "";
            removeClass(highlightedWord, "audiosyncHighlightClass");
        }
    }
    var wordElement = document.getElementById(wordId);
    var isContentScrolled = false;
    if(wordElement){
        var isElemInView = isInViewRect(wordElement);
        if(!isElemInView){
            scrollElementInToView(wordElement);
            isContentScrolled = true;
        }
        if(wordElement){
            wordElement.style.backgroundColor = color;
            addClass(wordElement, "audiosyncHighlightClass");
        }
    }
    return isContentScrolled;
}
function highlightWordWithoutAutoScrollingByWordId(wordId,color)
{
    var highlightedWords = document.getElementsByClassName("audiosyncHighlightClass");
    for(var i = 0; i < highlightedWords.length; i++){
        var highlightedWord = highlightedWords[i];
        if(highlightedWord){
            highlightedWord.style.backgroundColor = "";
            removeClass(highlightedWord, "audiosyncHighlightClass");
        }
    }
    var wordElement = document.getElementById(wordId);
    var isContentScrolled = false;
    if(wordElement){
        var isElemInView = isInViewRect(wordElement);
        if(!isElemInView){
            //scrollElementInToView(wordElement);
            isContentScrolled = false;
        }
        if(wordElement){
            wordElement.style.backgroundColor = color;
            addClass(wordElement, "audiosyncHighlightClass");
        }
}
return isContentScrolled;
}
function getFirstVisibleWord(wordArrayString)
{
    var wordArray = wordArrayString.split(',');
    for(var i = 0; i < wordArray.length; i++){
        var wordId = wordArray[i];
        var wordElement = document.getElementById(wordId);
        if(wordElement && isFirstWord(wordElement)){
            var jsonString = JSON.stringify({
            wordId: wordId,
            wordText: wordElement.innerText
            });
            return jsonString;
        }
    }
    return "";
}
                                                           
function isFirstWord(elem) {
   var bounding = elem.getBoundingClientRect();
   return ( (bounding.top + bounding.height) >= 0 && bounding.left >= 0);
}
