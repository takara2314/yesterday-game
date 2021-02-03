enchant();

window.onload = function() {
    core = new Core(512, 512);

    core.fps = 60;
    core.preload('takara2314.png');

    core.onload = function() {
        var player = new Sprite(256, 256);
        player.image = core.assets['takara2314.png'];
        core.rootScene.addChild(player);
    }

    core.start();
}