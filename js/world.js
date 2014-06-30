World = function(attr) {
    this.bg = attr.bg || Uno.bg;
    this.name = attr.name || Uno.name;
    this.render();
};

World.prototype.render = function() {
    var world = new Image();
    world.src = this.bg;
    world.onload = function() {
        ctx.drawImage(world, 0, 0);
    };

};