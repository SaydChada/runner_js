/**
 *
 * Background object, handle draw and reset of sky, paralaxBack and paralaxFront
 **
 *
 * @param bgImage
 * @param skyCfg
 * @param paralaxBackCfg
 * @param paralaxFrontCfg
 * @constructor
 */
function BackGround(bgImage, skyCfg, paralaxBackCfg, paralaxFrontCfg){

    this.sky = skyCfg;
    this.paralaxBack =  paralaxBackCfg;
    this.paralaxFront =  paralaxFrontCfg;
    this.bg = bgImage;

    /**
     *
     * @param speed player's current speed
     */
    this.reset = function(speed){
        this.sky.x = 0;
        this.sky.y = 0;
        this.sky.speed = speed / 10;

        this.paralaxBack.x = 0;
        this.paralaxBack.y = 0;
        this.paralaxBack.speed =  speed / 5;

        this.paralaxFront.x = 0;
        this.paralaxFront.y = 0;
        this.paralaxFront.speed =  speed / 2;
    };
    /**
     * Handle differents old_imgs background draw
     * @param element
     * @param ctx
     */
    drawElement = function(element, ctx){
        // Check element if full displayed on canvas then reset x
        if (Math.abs(element.x) >= element.image.width)
        {
            element.x = 0;
        }
        element.x -= element.speed;
        ctx.drawImage(element.image, element.x, element.y);
        ctx.drawImage(element.image, element.x + canvas.width, element.y);
    };

    this.draw = function(ctx){
        //Always draw bg
        ctx.drawImage(this.bg, 0, 0);

        // Draw every elements in background
        drawElement(this.sky, ctx);
        drawElement(this.paralaxBack, ctx);
        drawElement(this.paralaxFront, ctx);

    };
}
