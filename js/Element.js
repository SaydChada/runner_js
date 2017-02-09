'use strict';
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
    this.speed  = speed;
    this.image  = image;

    /**
     * Draw to context
     */
    this.draw = function(ctx) {
        this.updateXandY(this.speed);
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y);
        ctx.restore();
    };
}
Element.prototype = new Collision();