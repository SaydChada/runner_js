'use strict';
/**
 * Load asset before game start
 * @param {function} game : callback of the game
 * @param {boolean} andStart : say if game start direct after all loaded
 */
function load(game, andStart){

    /**
     * Assets to load
     */
    var assets = {
        imagesLoaded: 0,
        totalImages: 0,
        images : {
            'bg'                       : 'imgs/bg.png',
            'sky'                      : 'imgs/sky.png',
            'paralaxBack'              : 'imgs/bg_paralax_back.png',
            'paralaxFront'             : 'imgs/bg_paralax_front.png',
            'block'                    : 'imgs/block.png',
            'player'                   : 'imgs/character.png',
            'lava'                     : 'imgs/lava.png',
            'simple_blocks'            : 'imgs/simple_blocks.png',
            'blocks'                   : 'imgs/blocks.png',
            'plateform'                : 'imgs/plateform.png',
            'plateform_gold'           : 'imgs/plateform_gold.png'
        }
    };

    assets.totalImages = (Object.keys(assets.images)).length;

    // Ensure that all images are loaded then call start game
    for (var name in assets.images){
        var image = new Image();
        image.src = assets.images[name];
        image.title = name;
        image.addEventListener('load', function(){
            assets.imagesLoaded++;
            if(assets.totalImages === assets.imagesLoaded){
                start();
            }
        });
        // Replace
        assets.images[name] = image;
    }


    // Start the game with assets object
    function start(){
        // Inject data to game
        game.data = {images: assets.images};
        if(andStart){
            game();
        }
    }

}
