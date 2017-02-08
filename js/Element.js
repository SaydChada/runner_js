/**
 * Element constructor
 * @param {int} x : x position of the elem
 * @param {int} y : y position of the elem
 * @param {int} speed : deplacement x, the player's speed
 * @param {string} image : element image
 * @constructor
 */
function Element(x, y, speed, image) {
    this.x      = x;
    this.y      = y;
    this.width  = 32;
    this.height = 32;
    this.image   = image;

    /**
     * Draw to context
     */
    this.draw = function(ctx) {
        this.dx = -speed;
        this.updateXandY();
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y);
        ctx.restore();
    };
}
Element.prototype = new Collision();