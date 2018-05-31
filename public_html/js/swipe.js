/* 
 * https://bigbulb.studio 
 * Bigbulb Studio
 * Contact us for game, web, or software development!
 * Author: Kirinnee97
 */
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            $(document).trigger("swipeLeft");
        } else {
            $(document).trigger("swipeRight");
        }                       
    } else {
        if ( yDiff > 0 ) {
            $(document).trigger("swipeUp");
        } else { 
            $(document).trigger("swipeDown");
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

