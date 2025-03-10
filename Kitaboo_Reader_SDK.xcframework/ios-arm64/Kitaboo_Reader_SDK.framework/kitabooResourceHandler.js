

var srcNodeList = document.body.querySelectorAll('[src], [*|href]');
var srcs = [];
for (var i = 0; i < srcNodeList.length; ++i) {
    var item = srcNodeList[i];
    if (item.getAttribute('src') !== null) {
        srcs.push({
        tag: item.tagName,
        value: item.getAttribute('src')
        });
    }
    if (item.getAttribute('data-imgsrc') !== null) {
        srcs.push({
        tag: item.tagName,
        value: item.getAttribute('data-imgsrc')
        });
    }
    if (item.getAttributeNS('http://www.w3.org/1999/xlink', 'href') !== null) {
        srcs.push({
        tag: item.tagName,
        value: item.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
        });
    }
}
window.webkit.messageHandlers.contentLoaded.postMessage({
    'message': srcs
});

