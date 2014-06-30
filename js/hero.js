Hero = function(attr) {
    this.name = attr.name || "Homero";
    this.posX = 10;
    this.posY = 400;
    this.currentPosition = 10;
    this.height = 100;
    this.width = 100;
    this.custom = attr.custom || "img/hero.png";
    thiz = this;
    this.render();
    // return that;

};

Hero.prototype.walk = function(dir) {
    if (dir === 1) {
        if (thiz.currentPosition !== 0 && thiz.currentPosition < 650) {
            thiz.currentPosition = thiz.currentPosition + 24;
        }

    } else {
        if (thiz.currentPosition <= 800 && thiz.currentPosition > 0) {
            thiz.currentPosition = thiz.currentPosition - 24;
        }
    }

    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(hero, thiz.currentPosition, thiz.posY);
};

Hero.prototype.jump = function(y) {
    console.log("jump");

};

Hero.prototype.shoot = function() {
    console.log("shoot");
};

Hero.prototype.Die = function() {
    console.log("Die");
};

Hero.prototype.render = function() {
    hero = new Image();
    hero.src = this.custom;
    hero.onload = function() {
        ctx.drawImage(hero, 0, 400);
    };

};