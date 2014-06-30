function createImage(img, x, y) {
    var imageObj = new Image();
    imageObj.src = img;
    imageObj.onload = function() {
        Stage.context.drawImage(imageObj, x, y);
    };
}