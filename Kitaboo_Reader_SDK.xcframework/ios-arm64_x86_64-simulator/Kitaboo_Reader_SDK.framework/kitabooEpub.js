
var currentZoomScale=1.0;
var lastTap = 0;
var prevItem;
var doubleTappedElement;
var ahead=false;
var audioMarkClass;
var wordsPerMinute = 180;
var _isTTSPlay = false;
var elements;
// Set font size
function setFontSize(classes) {
    //alert("FontSize");
    var elm = document.getElementsByTagName( 'html' )[0];
    removeClass(elm, "mediumFont");
    removeClass(elm, "smallFont");
    removeClass(elm, "largeFont");
    removeClass(elm, "xLargeFont");
    removeClass(elm, "xxLargeFont");
    addClass(elm, classes);
    //updateAllsticks();
    //updatefonts(document,classes);
}

function updatefont(root,fontType)
{
    if (root.nodeType == 3) // text node
    {
        addfont(root,fontType);
        return;
    }
    var children = root.childNodes;
    for (var i = children.length - 1 ; i >= 0 ; i--)
    {
        updatefont(children[i],fontType);
    }
}

function videoPauseAction(){
    console.log('video paused');
    window.webkit.messageHandlers.videoPaused.postMessage("success");
}
function videoPlayAction(){
    console.log('video played');
    window.webkit.messageHandlers.videoPlayed.postMessage("success");
}
//function onVideoTapped(){
//    window.webkit.messageHandlers.videoTapped.postMessage("success");
//}
function onFullScreen(e) {
    if (e.type == 'webkitbeginfullscreen'){
        console.log('webkitbeginfullscreen');
        window.webkit.messageHandlers.videoFullScreen.postMessage("success");

    }
    else if (e.type == 'webkitendfullscreen'){
        console.log('webkitendfullscreen');
        window.webkit.messageHandlers.videoExitFullScreen.postMessage("success");

    }
   console.log('onFullScreen');
}

function addfont(ele,fontType){
    
    var parent = ele.parentNode;
    var ele =parent;
    var type = fontType;
    switch (fontType) {
        case 'xxSmallFont':
            type = "xx-small";
            break;
        case 'xSmallFont':
            type = "x-small";
            break;
        case 'smallFont':
            type = "small";
            break;
        case 'mediumFont':
            type = "medium";
            break;
        case 'largeFont':
            type = "large";
            break;
        case 'xLargeFont':
            type = "x-large";
            break;
        case 'xxLargeFont':
            type = "xx-large";
            break;
    }
    ele.setAttribute('style','font-size:'+type);
}

function updatefonts(doc,fontType){
    updatefont(doc.body,fontType);
}

// Toggle Reader mode
function setReaderMode(classes) {
    var elm = document.documentElement;
    removeClass(elm, "nightMode");
    removeClass(elm, "sepiaMode");
    addClass(elm, classes);
    if(classes == "nightMode"){
       setBackgroundColorForPageBreak(true);
    }else{
        setBackgroundColorForPageBreak(false);
    }
}

// Change Textalignment
function setTextAlignment(classes){
    var elm = document.documentElement;
    removeClass(elm, "leftAlign");
    removeClass(elm, "rightAlign");
    removeClass(elm, "centerAlign");
    removeClass(elm, "justifyAlign");
    addClass(elm, classes);
}

function setLineSpacing(classes){
    var elm = document.documentElement;
    removeClass(elm, "smallLineSpacing");
    removeClass(elm, "mediumLineSpacing");
    removeClass(elm, "largeLineSpacing");
    addClass(elm, classes);
}


// MathJAX loading completed
function mathRenderingCompleted(){
    window.location = "mathload:completed"; 
}

//Transform Containt to Containter Size
function scaleContentToContainerSize(requiredHeight,requiredWidth)
{
    var currentHeight = document.body.clientHeight;
    var currentWidth = document.body.clientWidth;
    
    var viewportContentArray =document.querySelector("meta[name=viewport]").getAttribute("content").split(",");
    var i=0;
    for (i=0;i<viewportContentArray.length;i++)
    {
        var property=viewportContentArray[i].split("=")[0].replace(/\s/g, "").toLowerCase();
        if(property=="height")
        {
           currentHeight=viewportContentArray[i].split("=")[1];
        }
        else if(property=="width")
        {
            currentWidth=viewportContentArray[i].split("=")[1];
        }
    }
    if(isNaN(currentWidth))
    {
        currentWidth = document.body.clientWidth;
    }
    
    if(isNaN(currentHeight))
    {
        currentHeight = document.body.clientHeight;
    }
    //Try Scale to Height, if fails, do fit to width
    //Fit to Height
    var scalePercentage= ((requiredHeight*100)/currentHeight)/100;
    if((scalePercentage*currentWidth)>requiredWidth)
    {
        //Fit to Width
        scalePercentage= ((requiredWidth*100)/currentWidth)/100;
    }
    
    document.body.style.transform="scale("+scalePercentage+")";
    document.body.style.webkitTransform="scale("+scalePercentage+")";
    document.body.style.transformOrigin = "top left";
    document.body.style.webkitTransformOrigin = "top left";
   // document.body.style.marginTop=topMargin+"px";
   // document.body.style.marginLeft= leftMargin+"px";
    
    var newHeight =  Math.round(document.body.getBoundingClientRect().height+0.01);
    var newWidth = Math.round(document.body.getBoundingClientRect().width+0.01);
    var htmlContentWidthHeight=newWidth.toString()+","+newHeight.toString();
    return htmlContentWidthHeight;
}

function getPageSize()
{
    var currentHeight = document.body.clientHeight;
    var currentWidth = document.body.clientWidth;
    
    var viewportContentArray =document.querySelector("meta[name=viewport]").getAttribute("content").split(",")
    var i=0;
    for (i=0;i<viewportContentArray.length;i++)
    {
        var property=viewportContentArray[i].split("=")[0].replace(/\s/g, "").toLowerCase();
        if(property=="height")
        {
            currentHeight=viewportContentArray[i].split("=")[1];
        }
        else if(property=="width")
        {
            currentWidth=viewportContentArray[i].split("=")[1];
        }
    }
    var htmlContentWidthHeight=currentWidth.toString()+","+currentHeight.toString();
    
    return htmlContentWidthHeight;
}


function scaleContentToContainerSize(requiredHeight,requiredWidth)
{
    var currentHeight = document.body.clientHeight;
    var currentWidth = document.body.clientWidth;
    
    var viewportContentArray =document.querySelector("meta[name=viewport]").getAttribute("content").split(",")
    var i=0;
    for (i=0;i<viewportContentArray.length;i++)
    {
        var property=viewportContentArray[i].split("=")[0].replace(/\s/g, "").toLowerCase();
        if(property=="height")
        {
            currentHeight=viewportContentArray[i].split("=")[1];
            if(document.body.clientHeight == 0 || document.body.clientHeight == 1) {
                document.body.style.height = currentHeight + "px";
            }
        }
        else if(property=="width")
        {
            currentWidth=viewportContentArray[i].split("=")[1];
            if(document.body.clientWidth == 0 || document.body.clientWidth == 1) {
                document.body.style.width = currentWidth + "px";
            }
        }
    }
    if(isNaN(currentWidth))
    {
        currentWidth = document.body.clientWidth;
    }
    
    if(isNaN(currentHeight))
    {
        currentHeight = document.body.clientHeight;
    }
    //Try Scale to Height, if fails, do fit to width
    //Fit to Height
    var scalePercentage= ((requiredHeight*100)/currentHeight)/100;
    if((scalePercentage*currentWidth)>requiredWidth)
    {
        //Fit to Width
        scalePercentage= ((requiredWidth*100)/currentWidth)/100;
    }
    
    document.body.style.transform="scale("+scalePercentage+")";
    document.body.style.webkitTransform="scale("+scalePercentage+")";
    document.body.style.transformOrigin = "top left";
    document.body.style.webkitTransformOrigin = "top left";
    // document.body.style.marginTop=topMargin+"px";
    // document.body.style.marginLeft= leftMargin+"px";
    
    var newHeight =  Math.round(document.body.getBoundingClientRect().height+0.01);
    var newWidth = Math.round(document.body.getBoundingClientRect().width+0.01);
    var htmlContentWidthHeight=newWidth.toString()+","+newHeight.toString();
    return htmlContentWidthHeight;
}


function setEPUBLayout(layout)
{
    var meta = document.createElement("meta");
    meta.setAttribute("name", "epublayout");
    meta.setAttribute("content", layout);
    document.getElementsByTagName("head")[0].appendChild(meta);
    if(layout == "FixedLayout")
    {
        var images = document.getElementsByTagName("img");
        for (var img = 0; img<images.length; img++)
        {
            images[img].draggable = false;
        }
        addCSSRuleStyle('html','-webkit-touch-callout:none;overflow: hidden;');
    }
    else
    {
       window.removeEventListener('resize', doOnOrientationChange);
       window.addEventListener('resize', doOnOrientationChange);
    }
}
                          
function getLayout()
{
    try {
        return document.querySelector("meta[name=epublayout]").getAttribute("content");
    }
    catch (err)
    {
        return "";
    }
}

function setCurrentZoomScale(zoomScale)
{
    currentZoomScale=zoomScale;
}

var IsTwoPageModeEnable;
function enableTwoPageModeWithPageSeperation(enable)
{
    IsTwoPageModeEnable = true;
    var requiredHeight = window.innerHeight;
    var requiredWidth = (window.innerWidth/2);
    if(enable == true)
    {
        addCSSRuleStyle('html', 'height:' + requiredHeight + 'px; column-gap: 0px; column-width:' + requiredWidth + 'px; column-rule: 1px solid #A9A9A9;');
    }
    else
    {
        addCSSRuleStyle('html', 'height:' + requiredHeight + 'px; column-gap: 0px; column-width:' + requiredWidth + 'px;');
    }
}
                         
/*Because we are not getting correct inner height and width for diable two page mode.*/
var requiredCurrentHeight = window.innerHeight;
var requiredCurrentWidth = window.innerWidth;
function disableTwoPageMode()
{
    IsTwoPageModeEnable = false;
    var requiredHeight = window.innerHeight;
    var requiredWidth = window.innerWidth;
    if (isIPAD()){
        if (requiredHeight<=requiredWidth){
            requiredHeight = Math.max(requiredCurrentHeight, requiredCurrentWidth);
            requiredWidth = Math.min(requiredCurrentHeight, requiredCurrentWidth);
        }
    }
    addCSSRuleStyle('html', 'height:' + requiredHeight + 'px; column-gap: 0px; column-width:' + requiredWidth + 'px;');
    //Remove the added empty page, when two page is disabled.
    var element = document.getElementById('kitabooemptypage');
    if (element)
    {
        element.parentNode.removeChild(element);
    }
     var element = document.getElementById('kitabooemptypagelast');
     if (element)
     {
         element.parentNode.removeChild(element);
     }
}

function setBottomMargin(){
    document.body.style.marginBottom = "25px";
}
                         
function setMargin(marginValue){
    if(marginValue == "")
    {
        document.body.style.marginLeft = "";
        document.body.style.marginRight = "";
    }
    else
    {

        document.body.style.marginLeft = marginValue + "px";
        document.body.style.marginRight = marginValue + "px";
    }
}
                         
 function setAuthorKitabooMargin(marginValue){
    var suggestedDefaultMargin = "";
    try
    {
        if (marginValue == "IOSKitabooDefaultMargin") {
            suggestedDefaultMargin = marginValue = "";
        }
        window.kitabooMarginChange(marginValue);
    }
    catch(err)
    {
        
    }
    return suggestedDefaultMargin;
}

function setWebViewSettings(enable)
{
    if(enable == "true")
    {
        document.body.style.webkitUserSelect = "auto";
        document.body.style.webkitTouchCallout = "auto";
    }else
    {
        document.body.style.webkitUserSelect = "none";
        document.body.style.webkitTouchCallout = "none";
    }
}

function addEmptyPage()
{
    //If empty page is aleardy represented, return.
    var element = document.getElementById('kitabooemptypage');
    if (element)
    {
        return;
    }
    
    //Add empty page if it is not presented.
    var emptypage = document.createElement('div');
    emptypage.setAttribute('id','kitabooemptypage');
    emptypage.setAttribute('style','height:' + (window.innerHeight - getPadding()) + 'px;display:block;background-color:transparent;');
    document.body.insertBefore(emptypage,document.body.firstChild);
}

function addBlankPageForReflowableBookWhereChapterEnds()
{
 //If empty page is aleardy represented, return.
 var element = document.getElementById('kitabooemptypagelast');
 if (element)
 {
     return;
 }
 
 //Add empty page if it is not presented.
 var emptypage = document.createElement('div');
 emptypage.setAttribute('id','kitabooemptypagelast');
 emptypage.setAttribute('style','height:' + (window.innerHeight - getPadding()) + 'px;display:block;background-color:transparent;');
 document.body.insertBefore(emptypage,document.body.lastChild);
}
function addVideoFullScreenListners()
{
  //Get All the videos.
  var videos = document.getElementsByTagName("video");
  for (var i = 0; i<videos.length; i++)
  {
      videos[i].addEventListener('webkitbeginfullscreen', onFullScreen);
      videos[i].addEventListener('webkitendfullscreen', onFullScreen);
  }
}
                            
function resizeAllTheImages(coverImage)
{
    //Get All the images.
    var images = document.getElementsByTagName("img");
    for (var img = 0; img<images.length; img++)
    {
      if(images[img].id != "modalElement")
      {
        resizeElement(images[img])
        /*To make cover image as center align and not to change alignment as per text alignment, so assigned property block to cover image only.*/
        if (isCoverImage(images[img],coverImage)) {
            resizeElement(document.body)
            images[img].style.display = "block"
        }
      }
    }
}
                         
 function resizeImagesForIphoneLandscape(coverImage)
 {
     //Get All the images.
     var images = document.getElementsByTagName("img");
     for (var img = 0; img<images.length; img++)
     {
       if(images[img].id != "modalElement")
       {
        /*To make cover image as center align and not to change alignment as per text alignment, so assigned property block to cover image only.*/
          if (isCoverImage(images[img],coverImage)) {
            resizeElement(images[img])
            resizeElement(document.body)
            images[img].style.display = "block"
          }else{
            images[img].removeAttribute("style")
         }
      }
     }
 }
                         
 function resizeElement(element){
    if(!isIPAD()) {
        element.setAttribute('style','max-height:' + (window.innerHeight - (getPadding()+30)) +'px !important;height:auto !important;');
    }else {
        element.setAttribute('style','max-height:' + (window.innerHeight - (getPadding()+30)) +'px !important;height:auto !important;');
    }
 }
  
 function isCoverImage(imageElement,coverImage){
     if(coverImage == "")
     {
        return false;
     }
     if (((imageElement.getAttribute('src').includes(coverImage)) || (imageElement.getAttribute('src').includes(coverImage.substr(0, coverImage.lastIndexOf("."))
     ))) || ((imageElement.getAttribute('src') != undefined) && imageElement.getAttribute('src').toLowerCase().includes('images/cover.jpg'))) {
        return true;
     }else{
        return false;
     }
 }
                         
function paginationOff()
{
    IsTwoPageModeEnable = false;
    var stylesheetLength = document.styleSheets.length;
    var stylesheetLastEle = stylesheetLength-1;
    var mySheet = document.styleSheets[stylesheetLastEle];
    if(mySheet.cssRules)
    {
        for (var i = 0; i < mySheet.cssRules.length; i++)
        {
            if (mySheet.cssRules[i].selectorText == 'html')
                mySheet.removeRule(i);
        }
    }
    
    //Remove the added empty page when pagination is off.
    var element = document.getElementById('kitabooemptypage');
    if (element)
    {
        element.parentNode.removeChild(element);
    }
                         
    var element = document.getElementById('kitabooemptypagelast');
    if (element)
    {
        element.parentNode.removeChild(element);
    }
    setBottomMargin();
}


function changeFontFamily(fontFamily)
{
    $("h1,h2,h3,h4,h5,h6,div,p,span,a,td,tr,figcaption,kdn").not( "[class^='icon-']" ).not( "[class$='-icon']" ).not( "[class*='icon']" ).not( "[class*='ignore-activity-classes']" ).not( "[class^='vjs-']" ).css('font-family', fontFamily);
}

function getPadding()
{
    var currentPadding = parseInt(window.getComputedStyle(document.body).paddingTop) + parseInt(window.getComputedStyle(document.body).paddingBottom);
    return currentPadding;
}

function addCSSRuleStyle(selector, newRule)
{
    var stylesheetLength = document.styleSheets.length;
    var stylesheetLastEle = stylesheetLength-1;
    var mySheet = document.styleSheets[stylesheetLastEle];
    if (mySheet != undefined)
    {
        if (mySheet.addRule)
        {
            if(mySheet.cssRules)
            {
                for (var i = 0; i < mySheet.cssRules.length; i++)
                {
                    if (mySheet.cssRules[i].selectorText === 'html')
                    {
                        mySheet.removeRule(i);
                    }
                }
            }
            mySheet.addRule(selector, newRule);
        } else
        {
            ruleIndex = mySheet.cssRules.length;
            mySheet.insertRule(selector + '{' + newRule + ';}', ruleIndex);
        }
    } else
    {
        console.log('stylesheet not available');
    }
}

function getCFINodeString() {
    var currentrange = document.caretRangeFromPoint(0, 0);
    var cfi = "";
    if (currentrange.startContainer.nodeType == 3 && currentrange.startOffset != 0)
    {
        cfi = EPUBcfi.Generator.generateCharOffsetRangeComponent(currentrange.startContainer, currentrange.startOffset, currentrange.endContainer, currentrange.endOffset, null, null, null);
    }
    else
    {
        var node = getFirstVisibleNode(document.body) || document.body;
        if (node.nodeType === Node.TEXT_NODE)
        {
            cfi = EPUBcfi.Generator.generateCharacterOffsetCFIComponent(node, 0);
        }
        else
        {
            cfi = EPUBcfi.Generator.generateElementCFIComponent(node);
        }
    }
    cfi = EPUBcfi.Generator.generateCompleteCFI("/0!", cfi);
    return cfi;
}
//    window.onscroll = e => {
//      let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop
//      // Scroll reach the target
//        print(currentScrollOffset);
//          if (currentIndex != -1 && !isElementInViewports(elements[currentIndex])  && scrollEnabled == "false"){
//            print("Restart playing")
//            if(_isTTSPlay){
////              var className = "epub-media-overlay-playing";
////              elements = document.querySelectorAll("span.sentence");
////              sentence = findSentenceWithIDInView(elements);
////              var text = sentence.innerText || sentence.textContent;
////              if (audioMarkClass){
////                  removeAllClasses(audioMarkClass);
////              }
////
////              audioMarkClass = className;
////              sentence.classList.add(className)
////              window.webkit.messageHandlers.playSelectedTapText.postMessage({
////                  'message': text
////              });
//              window.webkit.messageHandlers.restartTTSFromTop.postMessage("success");
//            }
////            else{
////              elements = document.querySelectorAll("span.sentence");
////            }
//          }
//    }
   var isScrolling;
  window.onscroll = e => {
       let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop
       // Scroll reach the target
         print(currentScrollOffset);
         
         if (scrollEnabled == "true"){
            if(_isTTSPlay){
              window.clearTimeout(isScrolling);
              isScrolling = setTimeout(function(){
                var className = "epub-media-overlay-playing";
                elements = document.querySelectorAll("span.sentence");
                for (var i = 0; i < elements.length; i++)
                {
                  if (isElementInViewportNew(elements[i]) == true){
                    elem = elements[i];
                    currentIndex = i;
                    var text = elem.innerText || elem.textContent;
                    elem.classList.add(className);
                    window.webkit.messageHandlers.playSelectedTapText.postMessage({
                      'message': text
                    });
                    break;
                  }else{
                  }
                }
              }, 200)
             }
            else{
              elements = document.querySelectorAll("span.sentence");
            }
         }else{
           if (currentIndex != -1 && !isElementInViewports(elements[currentIndex])){
             if(_isTTSPlay){
               window.webkit.messageHandlers.restartTTSFromTop.postMessage("success");
             }
           }
         }
      //window.onscroll = null; // remove listener
     }
    function checkCurrentTTSVisibility(){
          if (currentIndex != -1 && !isElementInViewports(elements[currentIndex])){
            return false
          }else{
            return true
          }
    }
    function isElementInViewportNew (el)
    {
        var rect = el.getBoundingClientRect();
        var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        return (
               (rect.left >= 0)
            && (rect.top >= 0)
            && ((rect.left + rect.width) <= windowWidth)
            && ((rect.top + rect.height) <= windowHeight)
        );
    }
function isElementInViewports(el) {
  var rect = el.getBoundingClientRect();

  return rect.bottom > 0 &&
         rect.right > 0 &&
         rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
         rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
 }
function getViewportRect()
{
    var viewportRectJSon  = '{"x":0,"y":0,"width":'+window.innerWidth+',"height":'+window.innerHeight+'}'
    var viewportRect = constructDOMRect(viewportRectJSon)
    return viewportRect;
}

function constructDOMRect(rectJsonString)
{
    var rectJson = JSON.parse(rectJsonString);
    return new DOMRect(rectJson.x, rectJson.y, rectJson.width,rectJson.height);
}

function getFirstVisibleNode(node) {
    var range = document.createRange();
    range.selectNode(node);
    var rect = RangeFix.getBoundingClientRect(range);
    if (rect == null)
        return null;
    var viewportRect = getViewportRect();
    var intersects = rectIntersects(viewportRect, rect);
    var contains = rectContains(viewportRect, rect);
    if (contains)
    {
        return node;
    }
    else if (intersects)
    {
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++)
        {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE || childNodes[i].nodeType === Node.TEXT_NODE)
            {
                var childNode = getFirstVisibleNode(childNodes[i]);
                if (childNode)
                {
                    return childNode;
                }
            }
        }
        return node;
    }
    return null;
}

function rectIntersects(a, b)
{
    return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}

function rectContains(a, b)
{
    // check for empty first
    return a.left < a.right && a.top < a.bottom
    // now check for containment
    && a.left <= b.left && a.top <= b.top && a.right >= b.right && a.bottom >= b.bottom;
}

//jump to cfi
function getOffsetForCFI(CFIString,isForOffsetValue){
    try
    {
        if(!EPUBcfi.isRangeCfi(CFIString))
        {
            var node = EPUBcfi.Interpreter.getTargetElement(CFIString,document,null,null,null);
            var offsetLeft = scrollIntoCFINode(node[0],isForOffsetValue);
            return offsetLeft;
        }
        else
        {
            var range = EPUBcfi.Interpreter.getRangeTargetElements(CFIString,document,null,null,null);
            var finalSafeIndex = 0;
            var startSafeIndex = 0;
            var endSafeIndex = 0;
            var startOffset = 0;
            var endOffset = 0;
            if(range.startElement.length <= range.startOffset)
            {
                for(i=0;i<range.startElement.parentElement.childNodes.length;i++)
                {
                    if(range.startElement.parentElement.childNodes[i]==range.startElement && range.startElement.parentElement.childNodes[i+1])
                        {
                            range = range.startElement.parentElement.childNodes[i+1];
                            var offsetLeft = scrollIntoCFINode(range,isForOffsetValue);
                            return offsetLeft;
                        }
                }
            }
            if(range.startOffset)
            {
                startOffset = range.startOffset;
            }
            else
            {
                startOffset = 0;
            }
            if(range.endOffset)
            {
                endOffset = range.endOffset;
            }
            else
            {
                endOffset = 0;
            }
            if(range.startElement.length > 0 && range.startElement.length != range.startOffset && range.startElement.length > startOffset)
            {
                var substringLength = range.startElement.length - startOffset;
                var substringValue = range.startElement.substringData(startOffset,substringLength);
                var trimmedString = substringValue.trim();
                var spaceIndex = trimmedString.indexOf(" ");
                var firstWord = trimmedString.substring(0,spaceIndex);
                var firstWordIndex = substringValue.indexOf(firstWord);
                finalSafeIndex = firstWordIndex + firstWord.length;
                startSafeIndex = startOffset + finalSafeIndex;
                endSafeIndex = endOffset + finalSafeIndex;
            }
            else if(range.startElement.length <= startOffset)
            {
                startSafeIndex = range.startElement.length;
                endSafeIndex = range.startElement.length;
            }
            var convertedrange = document.createRange();
            convertedrange.setStart(range.startElement, startSafeIndex);
            convertedrange.setEnd(range.endElement, endSafeIndex);
            var dummylastvisiter = document.createElement('span');
            dummylastvisiter.setAttribute('style','position:-webkit-sticky;height: 0px; width: 0px; overflow: hidden; float: none;  display: inline-block; clear: both;');
            convertedrange.cloneRange().surroundContents(dummylastvisiter);
            var offsetLeft = scrollIntoCFINode(dummylastvisiter,isForOffsetValue);
            var pa = dummylastvisiter.parentNode;
            while (dummylastvisiter.firstChild) pa.insertBefore(dummylastvisiter.firstChild, dummylastvisiter);
            pa.removeChild(dummylastvisiter);
            pa.normalize();
            return offsetLeft;
        }
    }
    catch (err)
    {
        return 0;
    }
}

//scroll in to cfi node
function scrollIntoCFINode(nodeOrRange,isForOffsetValue)
{
    var scrollingElement = bodyOrHtml();
    // For Direction.VERTICAL
    var nodeOffsetTop, nodeOffsetHeight;
    // For Direction.HORIZONTAL
    var nodeOffsetLeft;
    if (nodeOrRange instanceof Range || nodeOrRange.nodeType === Node.TEXT_NODE) {
        var rect;
        if (nodeOrRange.nodeType && nodeOrRange.nodeType === Node.TEXT_NODE) {
            var range = document.createRange();
            range.selectNode(nodeOrRange);
            rect = RangeFix.getBoundingClientRect(range);
        } else {
            rect = RangeFix.getBoundingClientRect(nodeOrRange);
        }
        //return left or top as per requirement
        nodeOffsetTop = scrollingElement.scrollTop + rect.top;
        nodeOffsetHeight = rect.height;
        nodeOffsetLeft = scrollingElement.scrollLeft + rect.left;
        if(isForOffsetValue == "true")
        {
            return nodeOffsetTop;
        }
        if(scrollEnabled == "true")
        {
            return nodeOffsetLeft;
        }
        else
        {
            return nodeOffsetTop;
        }
        
    } else if (nodeOrRange.nodeType === Node.ELEMENT_NODE) {
        //return left or top as per requirement
        try
        {
            var absoluteOffset = getAbsPosition(nodeOrRange);
            nodeOffsetTop = absoluteOffset[1];
        }
        catch(err)
        {
            nodeOffsetTop = nodeOrRange.offsetTop;
        }
        nodeOffsetHeight = nodeOrRange.offsetHeight;
        nodeOffsetLeft = nodeOrRange.offsetLeft;
        if(scrollEnabled != "true")
        {
            return nodeOffsetTop;
        }
    } else {
        throw("-> Illegal Argument Exception, nodeOrRange -> " + nodeOrRange);
    }
    if(isForOffsetValue == 'true')
    {
        var pageValue = Math.floor(nodeOffsetTop/window.innerHeight);
        var offsetVal = nodeOffsetTop - pageValue;
        return offsetVal;
    }
    
                          
    var highlightOffSet = nodeOffsetTop;
    var pageNumber = Math.floor(highlightOffSet/window.innerHeight);
    var leftMargin = 0;
    var topMargin = 0;
    if(IsTwoPageModeEnable)
    {
        pageNumber = pageNumber/2;
    }
    leftMargin = (pageNumber)*(window.innerWidth);
    return leftMargin;
}

// TODO -> Check if this is required?
function bodyOrHtml() {
    if ('scrollingElement' in document)
    {
        return document.scrollingElement;
    }
    if (navigator.userAgent.indexOf('WebKit') != -1)
    {
        return document.body;
    }
    return document.documentElement;
}

function isCFIContextBookmarked(CFINodeOrRange)
{
    var value = getOffsetForCFI(CFINodeOrRange,'false');

    if(scrollEnabled == "true")
    {
        var CFIPage = Math.floor(value/window.innerWidth);
                                 
        var actualPosition = value/window.innerWidth;
        if((actualPosition-CFIPage)>0.8)
        {
            CFIPage = CFIPage+1;
        }
        
        var currPage = Math.floor(window.pageXOffset/window.innerWidth);
        
        if(CFIPage == currPage)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        var minValue = window.pageYOffset;
        var maxValue = minValue + window.innerHeight;
        if(value >= minValue && value < maxValue)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
                                  
function getCurrentVisibleCFIs()
{
  var allCFIElements = document.querySelectorAll('[data-cfi]')
  var currentCFIList = [];
  for (var i = 0; i < allCFIElements.length; i++) {
      var elem = allCFIElements[i];
      if(isInViewRect(elem) && !((elem.style.display === 'none') || (elem.style.visibility === 'hidden')))
      {
          var cfiString = elem.getAttribute('data-cfi');
          currentCFIList.push(cfiString);
      }
  }
  return currentCFIList.toString();
}

function disableScrollMode()
{
    var elm = document.documentElement;
    removeClass(elm, "disableScrollClass");
    addClass(elm, "disableScrollClass");
}
                                  
function enableScrollMode()
{
    var elm = document.documentElement;
    removeClass(elm, "disableScrollClass");
}
                                  
function doOnOrientationChange() {
  setTimeout(function() {
     window.location = "orientationchange";
  }, 200);
}

function setClickEventForElementModal(coverImage)
{
    var images = document.getElementsByTagName("img");
    for (var img = 0; img<images.length; img++)
    {
      if(images[img].id != "modalElement" && !isCoverImage(images[img],coverImage))
      {
        images[img].setAttribute('onclick',"elementClicked(event)");
        images[img].style.pointerEvents = "";
      }
    }
    var tables = document.getElementsByTagName("table");
    for (var table = 0; table<tables.length; table++)
    {
      if(tables[table].id != "modalElement")
      {
        tables[table].setAttribute('onclick',"elementClicked(event)");
        tables[table].style.pointerEvents = "";
      }
    }
}

function elementClicked(event)
{
    var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0 && prevItem == event.currentTarget)
    {
        var targetElement = event.currentTarget;
        if(targetElement.tagName.toLowerCase() == "img")
        {
            var captionText = getCaptionForElement(targetElement,document);
            var jsonString = JSON.stringify({
            path: targetElement.src,
            caption: captionText
            });
            window.location = "LoadImageModalPopUP:" + jsonString;
        }
        else
        {
            doubleTappedElement = event.currentTarget;
            window.location = "elementDoubleTapped";
        }
    }
    lastTap = currentTime;
    prevItem = event.currentTarget;
}
                                  
function openModalPopup(elementBackGroundColor,popupBackgroundColor)
{
    if(doubleTappedElement)
    {
        var captionText="";
        var modalPopup = document.getElementById("modalPopup");
        if(modalPopup != undefined)
        {
            modalPopup.parentElement.removeChild(modalPopup);
        }
        modalPopup = document.createElement("div");
        modalPopup.className = "modalPopup";
        modalPopup.setAttribute('id',"modalPopup");
        modalPopup.setAttribute('style','background-color:'+ popupBackgroundColor +' !important;');
        var modalChild = document.createElement("div");
        modalChild.className = "modalChild";
        var closeSpan = document.createElement("span");
        closeSpan.className = "modalCloseSpan";
        closeSpan.textContent = "2";
        closeSpan.setAttribute('onclick',"closeModalPopup(event)");
        var elementDiv = document.createElement("div");
        var elementCopy = doubleTappedElement.cloneNode(true);
        elementCopy.removeAttribute("onclick");
        elementCopy.style.height = "";
        elementCopy.style.width = "";
        elementCopy.id = "modalElement";
        if(elementCopy.tagName.toLowerCase() == "table")
        {
            elementCopy.classList.add("modalChild");
            var highlights = elementCopy.getElementsByTagName("highlightmark");
            var highlightsLength=highlights.length;
            for (var i = 0; i < highlightsLength; i++)
            {
                var highlightElement = highlights[0];
                var parentElement = highlightElement.parentElement;
                while (highlightElement.firstChild){
                    parentElement.insertBefore(highlightElement.firstChild, highlightElement);
                    parentElement.removeChild(highlightElement);
                    parentElement.normalize();
                }
            }
        }
        else
        {
            elementCopy.className = "modalChild";
        }
        var modalCaptionText = document.createElement("p");
        modalCaptionText.textContent = captionText;
        modalCaptionText.className = "modalCaptionClass";
                                  
        modalPopup.appendChild(modalChild);
        modalChild.appendChild(closeSpan);
        modalChild.appendChild(elementDiv);
        if(captionText == "")
        {
            elementDiv.className = "modalElementDiv";
        }
        else
        {
            elementDiv.className = "modalElementDivWithCaption";
            modalChild.appendChild(modalCaptionText);
        }
        elementDiv.appendChild(elementCopy);
        document.body.appendChild(modalPopup);
        modalChild.setAttribute('style','background-color:'+popupBackgroundColor+' !important;');
        elementDiv.setAttribute('style','background-color:'+elementBackGroundColor+' !important;');
        modalPopup.style.display= "block";
        window.location = "modalPopupOpened"
    }
}
                                  
function getCaptionForElement(ele, doc){
    var _eleParent = ele;
    var _caption = "";
    try
    {
          while(_eleParent.nextElementSibling === null && _eleParent != doc.body){
          _eleParent = _eleParent.parentElement;
          }
          if(_eleParent != doc.body) {
          _caption = (_eleParent.nextElementSibling && _eleParent.parentElement.innerText.trim().endsWith(_eleParent.nextElementSibling.innerText.trim())) ? _eleParent.nextElementSibling.innerText.trim() : (_eleParent.parentElement.innerText.trim().startsWith(_eleParent.nextElementSibling.innerText.trim())) ? _eleParent.parentElement.innerText.trim() : _eleParent.innerText.trim();
          }
    }
    catch (err)
    {
        return "";
    }
   return _caption;
}
                                  
function closeModalPopup(event)
{
    var modalPopup = document.getElementById("modalPopup");
    modalPopup.style.display= "";
    modalPopup.parentElement.removeChild(modalPopup);
    doubleTappedElement = null;
    window.location = "modalPopupClosed";
}
                                  
function loadPopup(id,title,url)
{
    if(getLayout() == "FixedLayout") {
        var jsonString = JSON.stringify({
        resourceId: id,
        resourceTitle: title,
        resourceURL: url
        });
        window.location = "LoadPopUP:" + jsonString;
    } else {
    window.location = "LoadPopUP:" + url;
    }
}
                                  
function setTouchEndEvent(){
  $(document).on('touchend touchcancel', function(elem) {
      touchend(elem)
  });
}

function touchend(elem){
  if (elem.target.tagName == "video"){
     return;
  }
  if(elem.target){
      if(elem.target.id){
          var wordInnerText = elem.target.innerText;
          var jsonString = JSON.stringify({
          wordId: elem.target.id,
          wordText: wordInnerText
          });
          window.location = "wordClicked:" + jsonString;
      }
      else if(elem.target.parentElement.id){
          var wordInnerText = elem.target.parentElement.innerText;
          var jsonString = JSON.stringify({
          wordId: elem.target.parentElement.id,
          wordText: wordInnerText
          });
          window.location = "wordClicked:" + jsonString;
      }
  }
}
                                  
function jumpToBookCFI(bookCFI)
{
    var selectorString = "[data-cfi='" + bookCFI +"']";
    var modalPopup = document.querySelector(selectorString);
    if(modalPopup)
    {
        scrollElementInToView(modalPopup);
    }
}
                          
                          function addWatermark(watermarktext,textColor)
                          {
            removeWatermark();
            var topValue = 500;
            var areaPerPage = 600000;
            var pageArea = document.body.clientHeight * document.body.clientWidth;
            var watermarkCount = pageArea/areaPerPage;
            if((watermarkCount-Math.floor(watermarkCount))<0.5)
            {
                watermarkCount = Math.ceil(watermarkCount);
            } else {
                watermarkCount = Math.ceil(watermarkCount) + 1;
            }
            for (var i = 0 ; i < watermarkCount ; i++)
            {
                var watermarkTextView = document.createElement("kitaboowatermark");
                watermarkTextView.innerText = watermarktext;
                watermarkTextView.style.top = topValue + "px";
                document.body.appendChild(watermarkTextView);
                topValue = topValue + 1000;
            }
     }
                          
    function addWatermarkForCustomPrint(watermarktext, textColor,additionalValue) {
            removeWatermark();
            var topValue = 200;
            var areaPerPage = 800000;
            var pageArea = document.body.clientHeight * document.body.clientWidth;
            var watermarkCount = pageArea / areaPerPage;
            if ((watermarkCount - Math.floor(watermarkCount)) < 0.5) {
                watermarkCount = Math.ceil(watermarkCount);
            } else {
                watermarkCount = Math.ceil(watermarkCount) + 1;
            }
            for (var i = 0; i < additionalValue; i++) {
                var watermarkTextView = document.createElement("kitaboowatermark");
                watermarkTextView.innerText = watermarktext;
                watermarkTextView.style.top = topValue + "px";
                document.body.appendChild(watermarkTextView);
                topValue = topValue + 900;
            }
        }

                                  
function removeWatermark()
{
    var watermarks = document.getElementsByTagName("kitaboowatermark");
    var watermarkCount = watermarks.length
    for (var i = 0; i<watermarkCount; i++)
    {
        var watermark = watermarks[0];
        watermark.parentElement.removeChild(watermark);
    }
}
                          
                          function printCurrentPage(isHrMode) {
            var anchors = Array.from(document.querySelectorAll('span[displayReflowNumber="Yes"]'));
            var pageBreak=getPrintCurrentVisiblePage()[0];
            if(!pageBreak){
                var pageBreak = anchors.find(function(anchor, index) {
                    var isFound = isElementInViewport(anchor, document.documentElement, isHrMode);
                    if (isFound === "ahead" && anchors.length - 1 == index) {
                        ahead = false;
                        return true;
                    } else if (isFound && isFound != "ahead") {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            return printableReflowEpubString(pageBreak.title)
        }
                          
                          function getPrintCurrentVisiblePage() {
            var allCFIElements = document.querySelectorAll('span[displayReflowNumber="Yes"]')
            var currentCFIList = [];
            for(var i = 0; i < allCFIElements.length; i++) {
                console.log("insideIf1 ---" +allCFIElements[i])
                if(isInViewRect(allCFIElements[i])) {
                    console.log("insideIf ---" +allCFIElements[i])
                    currentCFIList.push(allCFIElements[i]);
                }
            }
            return currentCFIList;
        }
                          
                          function printableReflowEpubString(data) {
            var allPrintPages = data.split(",");
            var allPrintPages = allPrintPages.map(myFunction);
            
            function myFunction(num) {
                return num.replace(/\s/g, '');
            }
            var iframe = document.getElementsByTagName("body");
            var txtNode = iframe[0];
            var totalContent = "";
            var allElements = document.getElementsByTagName('*');
            var pagebreakElements = [];
            
            for (var i = 0; i < allElements.length; i++) {
                var element = allElements[i];
                var epubType = element.getAttribute('epub:type');
                
                if (epubType === 'pagebreak') {
                    pagebreakElements.push(element);
                }
            }
            var allSpanTags = pagebreakElements
            var allSpanTagsTitle = [];
            for (var i = 0; i < allSpanTags.length; i++) {
                allSpanTagsTitle.push(allSpanTags[i].title);
            }
            var pagesSelectedForPrint = [];
            var isPageValid = true;
            for (var i = 0; i < allPrintPages.length; i++) {
                var pages = allPrintPages[i];
                if (pages.indexOf("-") !== -1) {
                    var range = pages.split("-");
                    var startRange = range[0];
                    var endRange = range[1];
                    if(startRange!=undefined && endRange!=undefined && !isNaN(startRange) && !isNaN(endRange)){
                        var startPage = parseInt(startRange, 10);
                        var endPage = parseInt(endRange, 10);
                        if(startPage < endPage && startPage!=endPage){
                            for (var j = startPage; j <= endPage; j++) {
                                pagesSelectedForPrint.push(j.toString());
                            }
                        }else{
                            //  ReflowablePageFragment.onPrintLoadingCompleted("");
                            return allSpanTagsTitle;
                        }
                    }else {
                        pagesSelectedForPrint.push(pages);
                    }
                    
                } else {
                    pagesSelectedForPrint.push(pages);
                }
            }
            
            // for check user input pages from pagebreak
            for(var i = 0;i< pagesSelectedForPrint.length ; i++){
                if(!allSpanTagsTitle.includes(pagesSelectedForPrint[i])){
                    isPageValid = false;
                    break;
                }
            }
            if(isPageValid){
                for (var p = 0, length = allPrintPages.length; p < length; p++) {
                    var printPages1 = allPrintPages[p].split("-")[0];
                    var printPages2 = allPrintPages[p].split("-")[1];
                    var substring = "";
                    if (printPages1 && printPages2 && !isNaN(printPages1) && !isNaN(printPages2)) {
                        printPages1 = parseInt(printPages1);
                        printPages2 = parseInt(printPages2);
                        var indexOfCurrentSpan = allSpanTagsTitle.indexOf(printPages2.toString());
                        var nextIndexOfCurrentSpan = indexOfCurrentSpan + 1;
                        var previousIndexOfCurrentSpan = allSpanTagsTitle.indexOf(printPages1.toString())-1;
                        var startSpan = null;
                        var endSpan = null;
                        for (var i = 0; i < allSpanTags.length; i++) {
                            var span = allSpanTags[i];
                            if (span.getAttribute('epub:type') === 'pagebreak' && span.getAttribute('title') == printPages1) {
                                startSpan = span;
                                
                            }
                            if (span.getAttribute('epub:type') === 'pagebreak' && span.getAttribute('title') == allSpanTagsTitle[nextIndexOfCurrentSpan]) {
                                endSpan = span;
                            }
                        }
                        
                        var startParent = startSpan;
                        
                        
                        var txtNodeInStringFormat = htmlToStringConversion(txtNode)
                        
                        var startParentInStringFormat = htmlToStringConversion(startSpan)
                        if (typeof allSpanTagsTitle[previousIndexOfCurrentSpan] === 'undefined') {
                            var start = 0;
                        } else {
                            var start = txtNodeInStringFormat.indexOf(startSpanInStringFormat);
                        }
                        
                        if (endSpan) {
                            var endParent = endSpan;
                            var endSpanInStringFormat = htmlToStringConversion(endSpan)
                        }
                        
                        if (typeof allSpanTagsTitle[nextIndexOfCurrentSpan] === 'undefined') {
                            var end = txtNodeInStringFormat.length;
                        } else {
                            var end = txtNodeInStringFormat.indexOf(endSpanInStringFormat);
                        }
                        console.log(txtNodeInStringFormat)
                        substring = txtNodeInStringFormat.substring(start, end);
                        console.log(substring);
                    }
                    else {
                        if(printPages1!=undefined && printPages2!=undefined && ((isNaN(printPages1) &&
                                                                                 !isNaN(printPages2)) || (!isNaN(printPages1) && isNaN(printPages2)) ||  (isNaN(printPages1) && isNaN(printPages2)))){
                            printPages1 = printPages1+"-"+printPages2;
                        }
                        console.log("resultHTML  "+printPages1);
                        var txtNodeInStringFormat = htmlToStringConversion(txtNode)
                        var startSpan = null;
                        for (var i = 0; i < allSpanTags.length; i++) {
                            var span = allSpanTags[i];
                            if (span.getAttribute('epub:type') === 'pagebreak' && span.getAttribute('title') == printPages1) {
                                startSpan = span;
                                break;
                            }
                        }
                        console.log("resultHTML2");
                        var startSpanInStringFormat = htmlToStringConversion(startSpan)
                        console.log("resultHTML2  "+ startSpanInStringFormat);
                        var indexOfCurrentSpan = allSpanTagsTitle.indexOf(printPages1);
                        var nextIndexOfCurrentSpan = indexOfCurrentSpan + 1;
                        var previousIndexOfCurrentSpan = indexOfCurrentSpan - 1;
                        console.log("resultHTML3"+nextIndexOfCurrentSpan);
                        console.log("resultHTML31"+allSpanTagsTitle);
                        if (typeof allSpanTagsTitle[nextIndexOfCurrentSpan] === 'undefined') {
                            console.log("resultHTML4");
                            if (typeof allSpanTagsTitle[previousIndexOfCurrentSpan] === 'undefined') {
                                var start = 0;
                            } else {
                                var start = txtNodeInStringFormat.indexOf(startSpanInStringFormat);
                            }
                            var end = txtNodeInStringFormat.length;
                            substring = txtNodeInStringFormat.substring(start, end);
                            console.log("resultHTML4"+start + " ," +end);
                        } else {
                            console.log("resultHTML5");
                            var endSpan = null;
                            for (var i = 0; i < allSpanTags.length; i++) {
                                var span = allSpanTags[i];
                                if (span.getAttribute('epub:type') === 'pagebreak' && span.getAttribute('title') == allSpanTagsTitle[nextIndexOfCurrentSpan]) {
                                    endSpan = span;
                                    break;
                                }
                            }
                            console.log("resultHTML6");
                            
                            var endSpanInStringFormat = htmlToStringConversion(endSpan)
                            var startParent = startSpan;
                            if (typeof allSpanTagsTitle[previousIndexOfCurrentSpan] === 'undefined') {
                                var start = 0;
                            } else {
                                var start = txtNodeInStringFormat.indexOf(startSpanInStringFormat);
                            }
                            
                            var end = txtNodeInStringFormat.indexOf(endSpanInStringFormat);
                            substring = txtNodeInStringFormat.substring(start, end);
                        }
                    }
                    totalContent = totalContent + substring;
                }
                console.log("resultHTML6  "+totalContent);
                var a = document.querySelectorAll('html')
                var html = a[0].outerHTML.substring(a[0].outerHTML.indexOf('<html'),a[0].outerHTML.indexOf('<body'));
                totalContent = a[0].outerHTML.substring(a[0].outerHTML.indexOf('<html'),a[0].outerHTML.indexOf('<body')) + "<body>" + totalContent + "</body></html>"
                return totalContent;
            }
            else {
                return allSpanTagsTitle;
            }
        }
                          function htmlToStringConversion(htmlNode) {
            var serializer = new XMLSerializer();
            var str = serializer.serializeToString(htmlNode);
            str = str.replaceAll(/ xmlns="[^"]+"/g, '');
            str = str.replaceAll(/ xmlns:epub="[^"]+"/g, '');
            return str;
        }
                          
                          
function setClassForPageBreak(className) {
    var anchors = Array.from(document.querySelectorAll('span[displayReflowNumber="Yes"]'));//'span[epub\\3Atype="pagebreak"]'
    for (var i = 0 ; i < anchors.length ; i++){
        removeClass(anchors[i], "reflowScrollViewAR");
        removeClass(anchors[i], "reflowScrollView");
        removeClass(anchors[i], "reflowSingleScrollViewAR");
        removeClass(anchors[i], "reflowSingleScrollView");
        addClass(anchors[i],className);
    }
}
  function setBackgroundColorForPageBreak(isNightMode) {
      var anchors = Array.from(document.querySelectorAll('span[displayReflowNumber="Yes"]'));//'span[epub\\3Atype="pagebreak"]'
      for (var i = 0 ; i < anchors.length ; i++){
          if (isNightMode){
              anchors[i].childNodes[0].setAttribute('style','background:white !important; color:black !important');
          }else{
              anchors[i].childNodes[0].setAttribute('style','background:#dad6d6 !important;');
          }
      }
  }

 function getVisibleThumbnail(isHrMode) {
    var anchors = Array.from(document.querySelectorAll('span[displayReflowNumber="Yes"]'));//'span[epub\\3Atype="pagebreak"]'
    var pageBreak = anchors.find(function(anchor, index) {
        var isFound = isElementInViewport(anchor, document.documentElement, isHrMode);
        if (isFound === "ahead" && anchors.length - 1 == index) {
            ahead = false;
            return true;
        } else if (isFound && isFound != "ahead") {
            return true;
        } else {
            return false;
        }
    });
    
    return pageBreak.title;
}
                          
function isElementInViewport(el, parent, isHrMode) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  if (isHrMode) {

      var rect = el.getBoundingClientRect();
      var rectSelection = parent.getBoundingClientRect()
      var scrollingElement = bodyOrHtml();
      var left = scrollingElement.scrollLeft + rect.left;
      var right = document.documentElement.scrollWidth - window.pageXOffset;

      if (left + rect.width > window.pageXOffset &&
          rect.right - rect.width < right) {
          ahead = false;
          return true;
      } else if (ahead && left > window.pageXOffset && rect.right + rect.right > right) {
          return true;
      } else if (left < window.pageXOffset && rect.right - rect.width < right) {
          ahead = true;
          return 'ahead';
      } else {
          ahead = false;
          return false;
      }

  } else {

      if (top > window.pageYOffset && height < parent.offsetHeight) {
          return true;
      } else if (top < window.pageYOffset) {
          return 'ahead';
      } else {
          return false;
      }
  }
}

                          
    function addWatermarkImage(watermarkImagePath,isIphone)
    {
            var element = document.getElementById('kitaboowatermarkImage');
            if (element)
            {
                return;
            }
            
            //Add empty page if it is not presented.
            var emptypage = document.createElement('div');
            emptypage.setAttribute('id','kitaboowatermarkImage');
            if (isIphone)
            {
                emptypage.setAttribute('style','position: fixed; height: 100%; width: 90%; z-index: 5; top: 0%; left: 5%; background-image: url(https://ebook.helpmesee.org/5.0/HelpMeSee/reader/shell/images/Helpmesee_logo_1.png); opacity: 1.0; pointer-events: none; background-repeat: no-repeat; background-position: center center;background-size: contain;');
            }else
            {
            emptypage.setAttribute('style','position: fixed; height: 100%; width: 80%; z-index: 5; top: 0%; left: 10%; background-image: url(https://ebook.helpmesee.org/5.0/HelpMeSee/reader/shell/images/Helpmesee_logo_1.png); opacity: 1.0; pointer-events: none; background-repeat: no-repeat; background-position: center center;background-size: contain;');
            }
            document.body.insertBefore(emptypage,document.body.lastChild);
    }
                                                            
  function removeWatermarkImage()
  {
      var watermarks = document.getElementsByTagName("kitaboowatermarkImage");
      var watermarkCount = watermarks.length
      for (var i = 0; i<watermarkCount; i++)
      {
          var watermark = watermarks[0];
          watermark.parentElement.removeChild(watermark);
      }
  }
                          
                          
//
  //tts support
  function setMediaOverlayStyle(style){
      document.documentElement.classList.remove("mediaOverlayStyle0", "mediaOverlayStyle1", "mediaOverlayStyle2");
      document.documentElement.classList.add(style);
  }
  function setMediaOverlayStyleColors(color, colorHighlight) {
      var stylesheet = document.styleSheets[document.styleSheets.length-1];
//      const elements =   document.body.getElementsByClassName('sentence epub-media-overlay-playing');
//      stylesheet.deleteRule(0);
      var root = document.querySelector(':root');

      root.style.setProperty('--bgcolor',color);

//
//      stylesheet.insertRule(".mediaOverlayStyle0 span.epub-media-overlay-playing { background: "+colorHighlight+" !important }");
//      stylesheet.insertRule(".mediaOverlayStyle1 span.epub-media-overlay-playing { border-color: "+color+" !important }");
//      stylesheet.insertRule(".mediaOverlayStyle2 span.epub-media-overlay-playing { color: "+color+" !important }");
//          for (var i = 0; i<elements.length; i++){
//            elements[i].classList.add(className);
//          }
  }
//
  var currentIndex = -1;
//
  function wrappingSentencesWithinPTags(){
     wrapDoc();
  }
  
  function wrapDoc() {
    // Get all the required elements: h1, h2, h3, h4, h5, h6, p, i, li
//    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, i, li, kdn, td,dt,div');
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, i, li,td,dt,span,kdn,div,a,strong,blockquote,var,kdb,mark,cite');

    // Iterate over each element
    elements.forEach(element => {
      // Wrap the inner text of the element with <span> elements
      wrapInnerText(element);
    });
  }


 function wrapInnerText(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                
              // Text node: Split the inner text into sentences using regular expressions
              var sentences = node.textContent.split(/([.!?])/).reduce((acc, val, i, arr) => {
                if (i % 2 === 0 && i < arr.length - 1) {
                  acc.push(val + arr[i + 1]);
                } else if (i === arr.length - 1 && val !== '') {
                  // Handle the case where the last element might not have a trailing delimiter
                  acc.push(val);
                }
                return acc;
              }, []);
              // (/(?<=[.!?])/)

                    // Create a document fragment to hold the modified content
                const fragment = document.createDocumentFragment();
                
                    // Iterate over each sentence
                sentences.forEach((sentence, index) => {
                    
                        // Create a new span element with the class "sentence"
                    const span = document.createElement('span');
                    span.classList.add('sentence');
                    
//                    if (index !== 0) {
//                            // If it's not the first sentence, append a space before the sentence
//                        span.appendChild(document.createTextNode(' '));
//                    }
//                    if (index != sentences.length - 1) {
//                        sentence = sentence + '.';
//                    }
                    
                        // Create a text node for the sentence
                    const sentenceNode = document.createTextNode(sentence);
                    
                        // Append the sentence node to the span element
                    span.appendChild(sentenceNode);
                    
                        // Append the span element to the fragment
                    fragment.appendChild(span);
                });
                
                    // Replace the text node with the modified content
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.closest('form')) {
                    return;
                }
                const childNodes = Array.from(node.childNodes);
                childNodes.forEach(childNode => {
                    if (childNode.classList && childNode.classList.contains('sentence')) {
                            // Skip wrapping if the child node already has the class "sentence"
                        return;
                    }
                    wrapInnerText(childNode);
                });
            }
        }
  function setOnClickOnTTSTexts(){
    var lnk = document.querySelectorAll("span.sentence");
    for (var i=0; i<lnk.length; i++) {
        lnk[i].setAttribute("onclick", "onTTSTextClicked(this,'" + i + "')");
    }
    return lnk.length;
  //    ReflowablePageFragment.setTTSSentenceCount(lnk.length);
  }
//
  function onTTSTextClicked(event, data){
        if(_isTTSPlay){
              var pos = parseInt(data);
             // ReflowablePageFragment.currentTTSTapPos(pos);
              var className = "epub-media-overlay-playing";
              currentIndex = data ;
              //var elements = document.querySelectorAll("span.sentence");
              var sentence = elements[currentIndex] ;
              var text = sentence.innerText || sentence.textContent;

              //goToEl(sentence);

              if (audioMarkClass){
                  removeAllClasses(audioMarkClass);
              }

              audioMarkClass = className;
              sentence.classList.add(className)
              //ReflowablePageFragment.playSelectedTapText(text);
            window.webkit.messageHandlers.playSelectedTapText.postMessage({
                'message': text
            });

        }
  }
  function stopTTSPlay(){
    _isTTSPlay = false
  }
//

  function getSentenceWithIndex(className , value) {
      _isTTSPlay = value;

      var sentence;
      var sel = window.getSelection();
      var node = null;
      elements = document.querySelectorAll("span.sentence");

      // Check for a selected text, if found start reading from it
      if (sel.toString() != "") {
          node = sel.anchorNode.parentNode;

          if (node.className == "sentence") {
              sentence = node

              for(var i = 0, len = elements.length; i < len; i++) {
                  if (elements[i] === sentence) {
                      currentIndex = i;
                      break;
                  }
              }
          } else {
              sentence = findSentenceWithIDInView(elements);
          }
      } else if (currentIndex < 0) {
          currentIndex = 0;
          sentence = findSentenceWithIDInView(elements);
      } else {
          sentence = findNextSentenceInArray(elements);
      }
     while ((sentence == null) || (sentence.innerText.trim() == '' || sentence.textContent.trim() == '')) {
        sentence = findNextSentenceInArray(elements);
        if (currentIndex >= elements.length){
          return null;
        }
      }
    
    if (sentence != null){
        if (sentence.innerText.trim() == '' && sentence.textContent.trim() == '')
        {
            sentence = findNextSentenceInArray(elements);
        }
        var text = sentence.innerText || sentence.textContent;
        goToEl(sentence);
        
        if (audioMarkClass){
            removeAllClasses(audioMarkClass);
        }
        
        audioMarkClass = className;
        sentence.classList.add(className);
        return text;
    }else{
       
        if (currentIndex >= elements.length){
            window.webkit.messageHandlers.gotoNextChapter.postMessage("success");
        }
        return '';
       
    }
  //    ReflowablePageFragment.selectedTextToPlay(text , currentIndex);

  }
//
  function findSentenceWithIDInView(els) {
      // @NOTE: is `span` too limiting?
      for(indx in els) {
          var element = els[indx];
                
          // Horizontal scroll
          if (document.scrollingElement.scrollTop == 0) {
              var elLeft = document.scrollingElement.clientWidth * Math.floor(element.offsetTop / window.innerHeight);
              // document.body.scrollLeft = elLeft;

              if (elLeft == document.scrollingElement.scrollLeft) {
                  currentIndex = parseInt(indx);
                  return element;
              }

          // Vertical
          } else if(element.offsetTop > document.scrollingElement.scrollTop) {
              currentIndex = parseInt(indx);
              return element;
          }
      }

      return null
  }

    function findNextSentenceInArray(els) {
        if(currentIndex >= 0) {
            currentIndex ++;
            if (currentIndex < els.length){
                return els[currentIndex];
            }
        }
        return null
    }

  function resetCurrentSentenceIndex() {
      currentIndex = -1;
      _isTTSPlay = false;
  }

  function rewindCurrentIndex() {
      currentIndex = currentIndex-1;
  }

  /**
   Go To Element - scrolls the webview to the requested element
   */
  function goToEl(el) {
            var parentTr = el.closest('tr');
            if (parentTr) {
              var initialOffset = el.getBoundingClientRect().top - parentTr.getBoundingClientRect().top;
              el.scrollIntoView({ behavior: 'auto', block: 'nearest' });
              var newOffset = el.getBoundingClientRect().top - parentTr.getBoundingClientRect().top;
              var scrollAdjustment = initialOffset - newOffset;
              window.scrollBy(0, scrollAdjustment);
            }
            
            else {
              if (!isElementInViewports(el)){
                var top = document.scrollingElement.scrollTop ;
                var elTop = el.offsetTop - 20;
                var bottom = window.innerHeight + document.scrollingElement.scrollTop;
                var elBottom = el.offsetHeight + el.offsetTop + 60
                if(elBottom > bottom || elTop < top) {
                  document.scrollingElement.scrollTop = el.offsetTop - 20
                }
                
                /* Set scroll left in case horz scroll is activated.
                 
                 The following works because el.offsetTop accounts for each page turned
                 as if the document was scrolling vertical. We then divide by the window
                 height to figure out what page the element should appear on and set scroll left
                 to scroll to that page.
                 */
                setTimeout(function(){
                  if( document.scrollingElement.scrollTop == 0 ){
                    var elLeft = document.scrollingElement.clientWidth * Math.floor(el.offsetTop / window.innerHeight);
                    document.scrollingElement.scrollLeft = elLeft;
                  }
                  return el;
                }, 200)
              }
          }
     
    }

  /**
   Remove All Classes - removes the given class from all elements in the DOM
   */
  function removeAllClasses(className) {
      var els = document.body.getElementsByClassName(className)
      if( els.length > 0 )
        for( i = 0; i <= els.length; i++) {
          if (els[i] !== null && els[i] !== undefined) {
            els[i].classList.remove(className);
          }
        }
  }

  /**
   Audio Mark ID - marks an element with an ID with the given class and scrolls to it
   */
  function audioMarkID(className, id) {
      if (audioMarkClass)
          removeAllClasses(audioMarkClass);

      audioMarkClass = className
      var el = document.getElementById(id);

      goToEl(el);
      el.classList.add(className)
  }
  //Close TTS, Page end and jump to next page
  function removeTTSHighlightTag(){
      _isTTSPlay = false;
      var className = "epub-media-overlay-playing";
      currentIndex = -1 ;
      removeAllClasses(className);
  }
  function playTTS(value){
        _isTTSPlay = value;
   }

  function isTTSPlaying(){
    return _isTTSPlay;
  }
//  //Forward backward button
//  function playNextTTSSentence(){
//      currentIndex = currentIndex+1;
//      if(_isTTSPlay){
//                  var pos = currentIndex;
//  //                ReflowablePageFragment.currentTTSTapPos(pos);
//                  var className = "epub-media-overlay-playing";
//                  var elements = document.querySelectorAll("span.sentence");
//                  var sentence = elements[currentIndex] ;
//                  var text = sentence.innerText || sentence.textContent;
//
//                  goToEl(sentence);
//
//                  if (audioMarkClass){
//                      removeAllClasses(audioMarkClass);
//                  }
//
//                  audioMarkClass = className;
//                  sentence.classList.add(className)
//          window.webkit.messageHandlers.playSelectedTapText.postMessage({
//              'message': text
//          });
//  //                ReflowablePageFragment.playSelectedTapText(text);
//
//      }
//  }
//  //backward  button
//  function playPreviousTTSSentence(){
//      currentIndex = currentIndex-1;
//      if(_isTTSPlay){
//            var pos = currentIndex;
//  //          ReflowablePageFragment.currentTTSTapPos(pos);
//            var className = "epub-media-overlay-playing";
//            var elements = document.querySelectorAll("span.sentence");
//            var sentence = elements[currentIndex] ;
//            var text = sentence.innerText || sentence.textContent;
//
//            goToEl(sentence);
//
//            if (audioMarkClass){
//               removeAllClasses(audioMarkClass);
//            }
//
//            audioMarkClass = className;
//            sentence.classList.add(className)
//          window.webkit.messageHandlers.playSelectedTapText.postMessage({
//              'message': text
//          });
//  //          ReflowablePageFragment.playSelectedTapText(text);
//
//            }
//
//  }

  function playNextTTSSentence(){
      currentIndex ++;
      playCurrentTTSPosition(true);
  }

  function playPreviousTTSSentence(){
       currentIndex --;
      playCurrentTTSPosition(false);

  }

  function playCurrentTTSPosition(isNext){
          if(_isTTSPlay){
            var pos = currentIndex;
              // ReflowablePageFragment.currentTTSTapPos(pos);
            var className = "epub-media-overlay-playing";
              //elements = document.querySelectorAll("span.sentence");
            var sentence = elements[currentIndex] ;
            var text = sentence.textContent;
              if(!isInViewRect(sentence)){
                goToEl(sentence);
              }
             
                if (text.trim() == ''){
                    isNext ? playNextTTSSentence() : playPreviousTTSSentence();
                    return;
                }
                if (audioMarkClass){
                    removeAllClasses(audioMarkClass);
                }
                
                audioMarkClass = className;
                sentence.classList.add(className)
                window.webkit.messageHandlers.playSelectedTapText.postMessage({
                    'message': text
                });
                
            }
      }
                          
////For Fixed Epub TTS
//
//var prevElement;
//var zIndexVal;
//sentence=[];
//                        
//function wrappingSentencesWithinPTagsFixedEpub(){
//    //renderDocFixedLayout(document.body);
//
//}
//                          
//function renderDocFixedLayout(body) {
// sentence = getAllNodesGroupedIntoSentencesByHeight(body);
// console.log('formed current page sentence',sentence);
//}
//
//function getAllNodesGroupedIntoSentencesByHeight (){
//var sentenceGroups = [];
//  var currentGroup = { height: [], width: [], x: [], y: [], nodes: [], top: [], text: "", right: 0 };
//  groupNodesToFormSentencesByHeight(rootNode, sentenceGroups, currentGroup);
//  if (currentGroup.height && currentGroup.nodes.length > 0) {
//    sentenceGroups.push({ height: currentGroup.height, width: currentGroup.width, x: currentGroup.x, y: currentGroup.y, top: currentGroup.top, nodes: currentGroup.nodes, text: currentGroup.text, right: currentGroup.right });
//  }
//  return sentenceGroups;
//
//}
//
//function groupNodesToFormSentencesByHeight(node, sentenceGroups, currentGroup) {
//  if (node) {
//    var zIndexV = window.getComputedStyle(node.parentElement).getPropertyValue('z-index');
//    if (zIndexV !== '' && Number(zIndexV) > -1 && node.tagName === 'IMG') {
//      zIndexVal = zIndexV;
//    }
//  }
//  if (isNonEmptyTextNode(node)) {
//    var textContent = node.nodeValue.trim();
//    var height = getNodeHeight(node.parentNode);
//
//    if (currentGroup.height.length === 0) {
//      currentGroup.height.push(height);
//    }
//    if (currentGroup.height.length === 0) {
//      currentGroup.width.push(node.parentNode.offsetWidth || node.parentNode.clientWidth);
//    }
//
//    if (height === currentGroup.height[currentGroup.height.length - 1]) {
//      var currentNodeRects = node.parentNode.getBoundingClientRect();
//      if (currentGroup.nodes.length === 0) {
//        currentGroup.x.push(currentNodeRects.x);
//        currentGroup.y.push(currentNodeRects.y);
//        currentGroup.top.push(currentNodeRects.top);
//      }
//      if (currentNodeRects.top !== currentGroup.top[currentGroup.top.length - 1]) {
//        var widthVal = Math.abs(prevElement.parentNode.getBoundingClientRect().right - currentGroup.x[currentGroup.x.length - 1]);
//        currentGroup.width.push(widthVal);
//        currentGroup.top.push(currentNodeRects.top);
//        currentGroup.x.push(currentNodeRects.x);
//        currentGroup.y.push(currentNodeRects.y);
//
//      } else {
//        prevElement = node;
//      }
//      currentGroup.text += node.textContent + " ";
//      if (node.parentNode.classList.contains('sentence-' + (sentenceGroups.length))) {
//        node.parentNode.classList.remove('sentence-' + (sentenceGroups.length))
//        node.parentNode.classList.add('sentence-' + (sentenceGroups.length + 1));
//      }
//      else {
//        var classList = [...node.parentNode.classList].filter(ele => {if(ele.indexOf('sentence-') > -1) {return ele}});
//        if(classList.length > 0) {
//          classList.forEach((className) => {
//            node.parentNode.classList.remove(className);
//          });
//        }
//        node.parentNode.classList.add('sentence-' + (sentenceGroups.length + 1));
//      }
//      currentGroup.right = currentGroup.right > currentNodeRects.right ? currentGroup.right : currentNodeRects.right;
//      currentGroup.nodes.push(node);
//
//      if (isSentence(textContent)) {
//        var grpWidth = currentNodeRects.top !== currentGroup.top[currentGroup.top.length - 1] ? currentNodeRects.width : prevElement.parentNode.getBoundingClientRect().right - currentGroup.x[currentGroup.x.length - 1];
//        var flag = 0;
//        currentGroup.nodes.forEach((ele) => {
//          if (ele.parentElement.getBoundingClientRect().top === currentGroup.top[currentGroup.top.length - 1]) {
//            ++flag;
//          }
//        });
//        grpWidth = flag > 1 ? grpWidth : currentNodeRects.width;
//        currentGroup.width.push(Math.abs(grpWidth));
//        sentenceGroups.push({ height: currentGroup.height, nodes: currentGroup.nodes, x: currentGroup.x, y: currentGroup.y, width: currentGroup.width, text: currentGroup.text, right: currentGroup.right });
//        currentGroup.height = [];
//        currentGroup.width = [];
//        currentGroup.x = [];
//        currentGroup.y = [];
//        currentGroup.top = [];
//        currentGroup.right = 0;
//        currentGroup.nodes = [];
//        currentGroup.text = "";
//      }
//    } else {
//      var currentNodeRects = node.parentNode.getBoundingClientRect();
//      var grpWidth = prevElement.parentNode.getBoundingClientRect().right - currentGroup.x[currentGroup.x.length - 1];
//      currentGroup.width.push(Math.abs(grpWidth));
//      sentenceGroups.push({ height: currentGroup.height, nodes: currentGroup.nodes, x: currentGroup.x, y: currentGroup.y, width: currentGroup.width, text: currentGroup.text, right: currentGroup.right });
//      prevElement = node;
//      currentGroup.height = [];
//      currentGroup.width = [];
//      currentGroup.x = [];
//      currentGroup.y = [];
//      currentGroup.top = [];
//      currentGroup.nodes = [];
//      currentGroup.text = node.textContent + " ";
//      currentGroup.height.push(height);
//      currentGroup.x.push(currentNodeRects.x);
//      currentGroup.y.push(currentNodeRects.y);
//      currentGroup.top.push(currentNodeRects.top);
//      if (node.parentNode.classList.contains('sentence-' + (sentenceGroups.length))) {
//        node.parentNode.classList.remove('sentence-' + (sentenceGroups.length))
//        node.parentNode.classList.add('sentence-' + (sentenceGroups.length + 1));
//      }
//      else {
//        var classList = [...node.parentNode.classList].filter(ele => {if(ele.indexOf('sentence-') > -1) {return ele}});
//        if(classList.length > 0) {
//          classList.forEach((className) => {
//            node.parentNode.classList.remove(className);
//          });
//        }
//        node.parentNode.classList.add('sentence-' + (sentenceGroups.length + 1));
//      }
//      currentGroup.nodes = [node];
//    }
//  } else if (node.nodeType === Node.ELEMENT_NODE) {
//    var nodeCollection = reorderElements(node.childNodes), childNodes;
//    childNodes = nodeCollection;
//    childNodes.forEach((childNode) => {
//      groupNodesToFormSentencesByHeight(childNode, sentenceGroups, currentGroup);
//    });
//  }
//}
//
//
//function isNonEmptyTextNode(node) {
//  return node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '';
//}
//
//
//function  getNodeHeight(node) {
//  return node.getBoundingClientRect().height; //node.offsetHeight || node.clientHeight;
//}
//
//function isSentence(text) {
//  // Implement your sentence validation logic here
//  // For simplicity, let's assume a sentence is anything ending with a period (.)
//  return /[.!?]/.test(text);
//}
//
//
//function  reorderElements(childElements) {
//  var elements = Array.from(childElements).filter((ele ) => {
//    return ele.nodeType !== Node.COMMENT_NODE;
//  });
//  var orderedEle = Array.from(elements).sort((a:HTMLElement, b: HTMLElement) => {
//    var bNode: HTMLElement = b.nodeType === Node.TEXT_NODE ? b.parentElement : b;
//    var aNode: HTMLElement = a.nodeType === Node.TEXT_NODE ? a.parentElement : a;
//    var aTop = Number(aNode.offsetTop);
//    var bTop = Number(bNode.offsetTop);
//    var aLeft = Number(aNode.offsetLeft);
//    var bLeft = Number(bNode.offsetLeft);
//
//    return aTop - bTop;
//  });
//  return orderedEle;
//}
//                          
//                          
