(function() {

    // bullet, octopus, shark and player object
    Entity = function(attr) {
        this.pos = attr.pos || [10, 10];
        this.size = attr.size || [50, 13];
        this.orientation = attr.orientation || 1;
        this.url = attr.url || "img/torpedo.png";
        this.speed = attr.speed || 500;
        return this;
    };

    // bad Sumarine object
    Submarine = function(attr) {
        this.pos = attr.pos || [100, 100];
        this.size = attr.size || [100, 30];
        this.orientation = attr.orientation || 1;
        this.url = attr.url || "img/badGuy.png";
        this.speed = attr.speed || 70;
        _this = this;
        this.shoot();
    };

    Submarine.prototype.shoot = function() {
        setTimeout(function() {
            t = new Entity({
                orientation: _this.orientation,
                speed: 100,
                url: (_this.orientation === 1 ? "img/bulletFlip.png" : "img/bullet.png"),
                pos: [_this.pos[0] + 25, _this.pos[1]],
                size: [25, 25]
            });
            Stage.enemies.push(t);
        }, 1000);

    };
})();