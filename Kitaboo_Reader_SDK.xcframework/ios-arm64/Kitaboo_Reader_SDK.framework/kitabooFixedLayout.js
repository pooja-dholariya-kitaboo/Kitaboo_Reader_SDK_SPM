//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  Listener for orientation change event
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

window.onorientationchange = function() {
    /*window.orientation returns a value that indicates whether iPhone is in portrait mode, landscape mode with the screen turned to the left, or landscape mode with the screen turned to the right. */
    var orientation = window.orientation;
    switch(orientation) {
        case 0:
            //Portraint Mode
            
            break;
            
        case 90:
            //Landscape Left
        case -90
            //Landscape Right
            
            break;
    }
}