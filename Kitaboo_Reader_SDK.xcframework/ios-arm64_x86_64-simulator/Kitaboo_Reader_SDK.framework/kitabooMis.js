// Class manipulation
function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
   // ele.classList.add(cls);
}

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
        //ele.classList.remove(cls);
    }
}

// Utility Methods
function convertHex(hex) {
    
    if (hex == undefined){
        return 'red';
    }
    hex = hex.replace('#', '');
    a = parseInt(hex.substring(0, 2), 16);
    r = parseInt(hex.substring(2, 4), 16);
    g = parseInt(hex.substring(4, 6), 16);
    b = parseInt(hex.substring(6, 8), 16);
    result = 'rgba(' + r + ',' + g + ',' + b + ',' + a / 255 + ')';
    return result;
}

// Update font size from px to em
function convertFontSizeFromPxToEm(){
    
    //    $("html").css('font-size', '1em');
    //    $("body").css('font-size', '1em');
    
    $("div").each(function(){
                  
                  var size = $(this).css('font-size');
                  var newSize = parseFloat(size) * 0.0625;
                  $(this).css('font-size', newSize+'em');
                  });
    
    $("span").each(function(){
                   
                   var size = $(this).css('font-size');
                   var newSize = parseFloat(size) * 0.0625;
                   $(this).css('font-size', newSize+'em');
                   });
    
    $("p").each(function(){
                
                var size = $(this).css('font-size');
                var newSize = parseFloat(size) * 0.0625;
                $(this).css('font-size', newSize+'em');
                });
    
    $("a").each(function(){
                
                var size = $(this).css('font-size');
                var newSize = parseFloat(size) * 0.0625;
                $(this).css('font-size', newSize+'em');
                });
    
    $("td").each(function(){
                 
                 var size = $(this).css('font-size');
                 var newSize = parseFloat(size) * 0.0625;
                 $(this).css('font-size', newSize+'em');
                 });
    
    $("tr").each(function(){
                 
                 var size = $(this).css('font-size');
                 var newSize = parseFloat(size) * 0.0625;
                 $(this).css('font-size', newSize+'em');
                 });
}
