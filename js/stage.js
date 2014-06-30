(function() {
    Stage = {
        bullets: [],
        enemies: [],
        explosions: [],
        init: function() {
            lastime = 0;
            lastShot = Date.now();
            gameTime = 0;
            isOver = false;
            Stage.create();
            Control.init();
            Stage.tick();
            myScore = 0;
            kills = 0;
        },
        create: function() {
            canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = 500;
            ctx = canvas.getContext("2d");
            document.body.appendChild(canvas);
            bg = ctx.createPattern(Assets.get('img/world1.jpg'), 'repeat');
            player = new Entity({
                size: [100, 65],
                pos: [300, 200],
                speed: 200,
                url: "img/goodGuy.png"
            });

        },


        render: function() {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            Entities.init(Stage.explosions);
            Entities.init(Stage.bullets);

            if (!isOver) {
                Entities.render(player);
            }

            Entities.init(Stage.enemies);

        },
        bind: function(vx) {
            if (Control.press('LEFT')) {
                player.pos[0] -= player.speed * vx;
                player.orientation = -1;
                player.url = "img/goodGuyFlip.png";
            }
            if (Control.press('RIGHT')) {
                player.pos[0] += player.speed * vx;
                player.orientation = 1;
                player.url = "img/goodGuy.png";
            }
            if (Control.press('UP')) {
                player.pos[1] -= player.speed * vx;
            }
            if (Control.press('DOWN')) {
                player.pos[1] += player.speed * vx;
            }
            if (Control.press('SPACE') && Date.now() - lastShot > 100) {
                var bulletCustome = (player.orientation === 1 ? "img/torpedo.png" : "img/torpedoFlip.png");

                torpedo = new Entity({
                    orientation: player.orientation,
                    url: bulletCustome,
                    pos: [player.pos[0] + player.size[0] / 2, player.pos[1] + player.size[1] / 2],
                    speed: 400
                });
                Stage.bullets.push(torpedo);
                lastShot = Date.now();
            }

        },
        update: function(vx) {
            gameTime = gameTime + vx;

            Entities.update(vx);
            Stage.bind(vx);

            if (Math.random() < 1 - Math.pow(0.993, 1)) {
                var or = Math.floor(Math.random() * 2) + 1;
                var start = (or === 1 ? canvas.width : 0);
                var sharkCustome = (or === 1 ? "img/shark.png" : "img/sharkFlip.png");
                var badGuyCustome = (or === 1 ? "img/badGuyFlip.png" : "img/badGuy.png");

                shark = new Entity({
                    orientation: or,
                    url: sharkCustome,
                    size: [100, 50],
                    pos: [start, Math.floor(Math.random() * canvas.height) + 1],
                    speed: 50
                });
                octopus = new Entity({
                    orientation: or,
                    url: "img/octopus.png",
                    pos: [start, Math.floor(Math.random() * canvas.height) + 1],
                    size: [70, 59],
                    speed: 30

                });
                badGuy = new Submarine({
                    orientation: or,
                    url: badGuyCustome,
                    pos: [start, Math.floor(Math.random() * canvas.height) + 1],
                    speed: 60
                });

                Stage.enemies.push(octopus);
                Stage.enemies.push(shark);
                Stage.enemies.push(badGuy);

            }
            Stage.collisions();
        },
        tick: function() {
            now = Date.now();
            vx = (now - lastime) / 500.0;
            requestAnimationFrame(Stage.tick);
            Stage.update(vx);
            lastime = now;
            Stage.render();
            // player.render();
        },
        limit: function() {

            if (player.pos[0] < 0) {
                player.pos[0] = 0;
            } else if (player.pos[0] > canvas.width - player.size[0]) {
                player.pos[0] = canvas.width - player.size[0];
            }

            if (player.pos[1] < 0) {
                player.pos[1] = 0;
            } else if (player.pos[1] > canvas.height - player.size[1]) {
                player.pos[1] = canvas.height - player.size[1];
            }
        },
        collides: function(x, y, r, b, x2, y2, r2, b2) {
            return !(r <= x2 || x > r2 || b <= y2 || y > b2);
        },
        boxCollides: function(pos, size, pos2, size2) {
            return Stage.collides(pos[0], pos[1],
                pos[0] + size[0], pos[1] + size[1],
                pos2[0], pos2[1],
                pos2[0] + size2[0], pos2[1] + size2[1]);
        },
        collisions: function() {
            Stage.limit();

            for (var i = 0; i < Stage.enemies.length; i++) {
                var pos = Stage.enemies[i].pos;
                var size = Stage.enemies[i].size;

                if (Stage.boxCollides(pos, size, player.pos, player.size)) {

                    Stage.gameOver();

                }


                for (var j = 0; j < Stage.bullets.length; j++) {
                    var pos2 = Stage.bullets[j].pos;
                    var size2 = Stage.bullets[j].size;

                    if (Stage.boxCollides(pos, size, pos2, size2)) {
                        // Remove the enemy
                        Stage.enemies.splice(i, 1);
                        i--;

                        // Add an explosion
                        Stage.explosions.push({
                            pos: pos,
                            url: "img/kaboom.png",
                            size: [100, 75]
                        });

                        Stage.score();
                        // Remove the bullet and stop this iteration
                        Stage.bullets.splice(j, 1);
                        break;
                    }
                }
            }
        },
        score: function() {
            myScore += 35;
            kills += 1;
            document.getElementById('score').innerHTML = myScore;
            document.getElementById('kills').innerHTML = kills;
        },
        gameOver: function() {
            isOver = true;
            document.getElementById('gameover').style.display = "block";
        },
        reset: function() {
            document.getElementById('gameover').style.display = 'none';
            canvas.remove();
            Stage.bullets = [];
            Stage.enemies = [];
            Stage.explosions = [];
            Stage.init();
        }
    };
})();