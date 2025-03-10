// Call glossary
function glossaryBlob(data, event){
    event.stopPropagation();
    window.location = "glossary:{\"data\": \""+data+"\", \"x\": "+event.pageX+", \"y\": "+event.pageY+"}";
}

// Call markup
//function loadPopup(id, title, path){
//    var event = window.event;
//    event.stopPropagation();
//    window.location = "loadpopup:{\"id\": \""+id+"\", \"path\": \""+path+"\", \"title\": \""+title+"\"}";
//}
