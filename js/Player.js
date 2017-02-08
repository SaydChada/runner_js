/**
 * Player object
 **
 * @param image to be used as sprite
 * @param width player width
 * @param height player height
 * @constructor
 */
function Player(image, width, height){

    // add properties directly to the player imported object
    this.width     = width;
    this.height    =  height;
    this.speed     =  GAME_SPEED ;
    this.image     = image.asSprite(width, height);
    this.animation = false;
    this.gravity   = 1;
    this.dy        = 0;
    this.jump = {dy : -20, jumping: false, falling: false};

    this.isDead = function(areaHeight){
        return(this.y + this.height >= areaHeight);
    };

    /**
     * Handle canvas 2D drawing of player's sprite
     */
    this.update = function(ctx) {
        // jump if not currently jumping or falling
        if (spaceBar.isOnKeyDown && this.dy === 0 && !this.jump.jumping) {
            this.jump.jumping = true;
            this.dy = this.jump.dy;
        }

        this.updateXandY();

        // add gravity
        if (this.jump.falling || this.jump.jumping) {
            this.dy += this.gravity;
        }

        this.anim(ctx).update();

    };

    this.anim = function(ctx){
        // TODO enclose new animation
        if(!this.animation){
            this.animation = new Animation(this.image, 4 , 0, 15, ctx);
            return this.animation;
        }else{
            return this.animation;
        }
    };

    /**
     * Draw the this at it's current position
     */
    this.draw = function(ctx) {
        //Update before draw
        this.update(ctx);
        this.anim(ctx).draw(this.x, this.y);
    };

    /**
     * Reset the player's position
     */
    this.reset = function() {
        this.x = 64;
        this.y = 250;
        this.speed = GAME_SPEED;
    };


}

Player.prototype = new Collision();