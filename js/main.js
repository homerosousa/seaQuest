document.onreadystatechange = function() {
    if (document.readyState === 'complete') {

        Assets.loading(
            [
                "img/badGuy.png",
                "img/badGuyFlip.png",
                "img/goodGuy.png",
                "img/goodGuyFlip.png",
                "img/torpedo.png",
                "img/torpedoFlip.png",
                "img/octopus.png",
                "img/shark.png",
                "img/sharkFlip.png",
                "img/world1.jpg",
                "img/world2.jpg",
                "img/bullet.png",
                "img/bulletFlip.png",
                "img/kaboom.png"
            ]
        );
        Assets.onFinish(Stage.init);

    }

};