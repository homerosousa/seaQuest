(function() {
    Entities = {
        init: function(arr) {
            // swipe array
            for (var i = 0; i < arr.length; i++) {
                Entities.render(arr[i]);
            }
        },
        render: function(entity) {
            // draw every object
            ctx.drawImage(Assets.get(entity.url), entity.pos[0], entity.pos[1], entity.size[0], entity.size[1]);
        },
        update: function(vx) {
            // update positions for bullet
            for (var i = 0; i < Stage.bullets.length; i++) {
                if (Stage.bullets[i].orientation === 1) {
                    Stage.bullets[i].pos[0] += Stage.bullets[i].speed * vx;
                } else {
                    Stage.bullets[i].pos[0] -= Stage.bullets[i].speed * vx;
                }
                // destroy the bullet
                if (Stage.bullets[i].pos[0] < 0 || Stage.bullets[i].pos[0] > canvas.width) {
                    Stage.bullets.splice(i, 1);
                    i--;
                }
            }
            // update positions for enemies
            for (var a = 0; a < Stage.enemies.length; a++) {
                if (Stage.enemies[a].orientation === 1) {
                    Stage.enemies[a].pos[0] -= Stage.enemies[a].speed * vx;
                } else {
                    Stage.enemies[a].pos[0] += Stage.enemies[a].speed * vx;
                }
                // destroy enemy
                if (Stage.enemies[a].pos[0] < 0 || Stage.enemies[a].pos[0] > canvas.width) {
                    Stage.enemies.splice(a, 1);
                    a--;
                }
            }

            //  remove explosions
            for (var e = 0; e < Stage.explosions.length; e++) {
                Stage.explosions.splice(e, 1);
                e--;
            }
        }
    };
})();