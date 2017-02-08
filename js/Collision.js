/**
 * Constructor Colision to handle colission
 * @constructor
 */
function Collision() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
}

Collision.prototype.updateXandY = function() {
    this.x += this.dx;
    this.y += this.dy;
};

Collision.prototype.impactWith = function(target) {

    var collision;

    var thisVector = {
        x : this.x + this.width/2,
        y: this.y + this.height/2
    }, againstVecor = {
        x : target.x + target.width/2,
        y: target.y + target.height/2
    };
    var x = (thisVector.x + this.dx ) - (againstVecor.x + target.dx);
    var y = (thisVector.y + this.dy ) - (againstVecor.y + target.dy);
    var dist =  Math.sqrt(Math.pow(x,2) + Math.pow(y, 2));

    collision = dist <= (this.height + target.width) /2 -5 ;
    return collision;



};