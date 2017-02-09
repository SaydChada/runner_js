'use strict';
/**
 * Paul Irish's requestAnimationFrame polyfill
 */
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();


/**
 * SpaceBar listener
 */
var spaceBar = {
    code: 32,
    isOnKeyDown: false
};

document.addEventListener('keydown', function(e) {
    e.preventDefault();
    if (spaceBar.code == e.keyCode) {
        spaceBar.isOnKeyDown = true;
    }
});
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    if (spaceBar.code == e.keyCode) {
        spaceBar.isOnKeyDown = false;
    }
});


/**
 * Tool functions
 */

// Get random number between range randomInt
Math.randomInt = function (min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min );
};

// Check and return number in range
Math.maxValueIn = function (value, min, max) {
    return Math.max( Math.min(value, max), min);
};

/**
 * Allow us to tell that an image acts as sprite, this function define some
 * usefull own properties
 */
Image.prototype.asSprite = function(frameWidth, frameHeight, frameSpeed) {
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameSpeed = frameSpeed;
    // Number of image in a row
    this.framesPerRow = Math.floor(this.width / this.frameWidth);

    return this;
};

/*
 Game vars config
 TODO move to config file
 */

const GAME_SPEED = 10.5;
const BLOCK_WIDTH = 32;