/**
 * Handle sprite animation cycle
 *
 * @param {Object} image   : Image that canvas can draw
 * @param {int} frameSpeed : Handle "sprite's speed"
 * @param {int} startFrame : The frame in sprite where we start animation
 * @param {int} endFrame   : Maximum of frames per row
 * @param {Object} ctx     :  Canvas 2d context
 * @constructor
 */
function Animation(image, frameSpeed, startFrame, endFrame, ctx) {
    var currentFrame = startFrame;
    var counterFrame = 0;
    this.image = image;
    this.ctx = ctx;

    /**
     * Increase current frame every framespeed, basicaly slow or increase anim
     *
     */
    this.update = function(){
        counterFrame++;
        if(currentFrame === endFrame){
            currentFrame = 0;
            // Prevent counterFrame to be incremented infinitely!!!
            counterFrame = 0;
        }
        else if(counterFrame % frameSpeed === 0){
            currentFrame++ ;
        }
    };

    /**
     * Draw the sprite
     *
     * @param x position x of the draw in context
     * @param y position x of the draw in context
     */
    this.draw = function(x, y) {

        counterFrame++;
        if(currentFrame === endFrame){
            currentFrame = 0;
            // Prevent counterFrame to be incremented infinitely!!!
            counterFrame = 0;
        }
        else if(counterFrame % frameSpeed === 0){
            currentFrame++ ;
        }

        // (0 -> n)/ number of image per row * largeur sprite
        // 0 % number of image per row * sprite height
        var row = Math.floor(currentFrame / image.framesPerRow) * image.frameHeight;
        var col = Math.floor(currentFrame % image.framesPerRow) * image.frameWidth;
        this.ctx.drawImage(this.image, col , row , image.frameWidth, image.frameHeight, x, y, image.frameWidth, image.frameHeight);

    };
}