Villian = function(attr) {
    this.name = attr.name || "Homero";
    this.posX = 10;
    this.posY = 10;
    this.height = 100;
    this.width = 100;
    this.custom = attr.custom || "default.png";
};

Villian.prototype.walk = function() {
    console.log("walk");
};

Villian.prototype.die = function() {
    console.log("walk");
};