(function () {
    'use strict';


    /*
     |--------------------------------------------------------------------------
     | Config vars for game
     |--------------------------------------------------------------------------
     */

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var score = 0;

    // Delay sprite adding element
    var spriteDelay = 0;

    // platform handle all plateforms in list
    var plateform = {
        defaultWidth: BLOCK_WIDTH,
        height: 2,
        width: 32,
        base: canvas.height - BLOCK_WIDTH,
        margin : 0,
        length : 0,
        space: 64,
        list: [],
        elements: ['simple_blocks', 'blocks', 'block', 'plateform', 'plateform_gold']
    };
    var lava = [];
    var decords = [];



    /*
     |--------------------------------------------------------------------------
     | Game object
     |--------------------------------------------------------------------------
     | over()    : display restart btn
     | update()  : handle draw of elements in canvas
     | ini()     : starting plateform and fill lava for the full canvas
     |
     */
    var game = {
        over : function(){
            document.getElementById('game-over').style.display = 'block';
            restartBtn.style.display = 'inline-block';
        },
        init: function(){

            var player = this.player;
            var images = this.images;

            for (var i = 0; i < plateform.width; i++) {
                plateform.list.push(
                    new Element(
                        i * plateform.width,
                        player.height * 2,
                        player.speed,
                        images['block']
                    )
                );

                lava.push(new Element(
                    i * plateform.width,
                    plateform.base,
                    player.speed,
                    images['lava'])
                );
            }

            for (i = 0; i < canvas.width ; i++) {
                lava.push(new Element(
                    i * plateform.width,
                    plateform.base,
                    player.speed,
                    images['lava'])
                );
            }
        },
        update: function(){

            // player is by default on fall state
            var player = this.player;
            player.jump.falling = true;
            player.speed += 1/1000;

            // Internal function handle update and clean of elements
            function drawAndClean(elements, checkImpact){

                for (var i = 0; i < elements.length; i++) {
                    elements[i].draw(ctx);

                    // stop the player from falling when landing on a platform
                    if (checkImpact && player.impactWith(elements[i])) {
                        player.jump.jumping = false;
                        player.jump.falling = false;
                        player.y = elements[i].y - player.height + 5;
                        player.dy = 0;
                    }
                }

                // clean array
                if (elements[0] && elements[0].x < -plateform.width) {
                    // Lava only added by cycle
                    if(elements[0].image.title === 'lava'){
                        var elem = elements.splice(0, 1)[0];
                        elem.x = elements[elements.length-1].x + plateform.width;
                        elements.push(elem);
                    }else{
                        elements.splice(0, 1);
                    }
                }
            }

            // update and clean elements
            drawAndClean(plateform.list, true);
            drawAndClean(lava);
            drawAndClean(decords);
            // finaly update score
            ctx.fillStyle = 'black';
            ctx.font = '25px arial, sans-serif';
            ctx.fillText('Score: ' + score, canvas.width * 0.75, 30);

            // After 500 score unlock cv text display until score 1100
            if (score > 500 && score < 600 ){
                ctx.font = '45px arial, sans-serif';
                ctx.fillStyle = '#ff566f';
                ctx.fillText('CV débloqué !!' , canvas.width * 0.3, 50);
                document.getElementById('cv_button').classList.remove('disabled');
            }
        },
        addElement: function(){

            var player = this.player;
            var images = this.images;

            // Gap between plateforms update
            if (plateform.margin > 0) {
                plateform.margin--;
            }
            // then create plateforms
            else if (plateform.length > 0) {

                var element = plateform.elements[plateform.height];

                plateform.list.push(new Element(
                    canvas.width + plateform.width % player.speed,
                    plateform.base - plateform.height * plateform.space,
                    player.speed,
                    images[element]
                ));
                plateform.length--;
            }
            else {
                //plateform separation space
                plateform.margin =Math.randomInt(player.speed - 2, player.speed);
                // Prevent displaying of plateform impossible to reach, height to far from last plateform height
                plateform.height = Math.maxValueIn(Math.randomInt(0, plateform.height + Math.randomInt(0, 2)), 0, 4);
                //plateform length
                plateform.length = Math.randomInt(4 , 20);
            }
        }
    };

    /**
     * Game start here
     */
    function startGame() {

        var images = startGame.data.images;
        /*
         |--------------------------------------------------------------------------
         | Player instance of Player
         |--------------------------------------------------------------------------
         */
        var player = new Player(images.player,75, 112);

        /*
         |--------------------------------------------------------------------------
         | background instance of Background
         |--------------------------------------------------------------------------
         */
        var background = new BackGround(
            images.bg,
            {x: 0, y: 50, speed: player.speed / 15, image: images.sky},
            {x: 0, y: 0, speed: player.speed / 8, image: images.paralaxBack},
            {x: 0, y: 15, speed: player.speed / 4, image: images.paralaxFront}
        );


        /*
         |--------------------------------------------------------------------------
         | Main game loop
         |--------------------------------------------------------------------------
         */
        function animationLoop() {

            // pllayer is dead ?
            if (player.isDead(canvas.height)) {
                player.reset();
                game.over();
                return;
            }

            requestAnimationFrame( animationLoop );

            // draw everything we need here
            background.draw(ctx);
            player.draw(ctx);
            // Call to pass player as the context object
            game.update.call({player: player});

            // Add elements randomly
            spriteDelay = spriteDelay > 1000 ? 0 : spriteDelay +1;
            if (spriteDelay % Math.floor(plateform.width / player.speed) === 0) {
                game.addElement.call({player: player, images: images} );
                score++;
            }

        }

        game.init.call({player : player, images: images});

        animationLoop();
    }

    // Assets load
    load(startGame);


    /*
     |--------------------------------------------------------------------------
     | Dom event and elements
     |--------------------------------------------------------------------------
     | startBtn
     | restartBtn
     | load on window
     |
     */

    var startBtn = document.getElementById('start');
    startBtn.addEventListener('click', function(){
        startGame();
        this.remove();
    });

    var restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', function(){
        spriteDelay = 0;
        score = 0;
        plateform.height = 2;
        plateform.length = 15;
        plateform.margin = 0;
        lava = [];
        decords = [];
        plateform.list = [];
        startGame();
        this.style.display = 'none';

    });

    // Temporary img till game stat
    window.addEventListener('load', function(){
        var waiting = new Image();
        waiting.src = './imgs/canvasLoader.png';
        waiting.alt = 'waiting_canvas';

        waiting.addEventListener('load', function(){
            ctx.drawImage(this, 0,0, 800, 480);
        })

    });
})();