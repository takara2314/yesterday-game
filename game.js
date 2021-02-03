// enchant.js のオブジェクト
// - Label
//     文字列を表示する描画オブジェクト
// - Sprite
//     画像を表示する描画オブジェクト
// - Map
//     タイル(小さな画像)を並べて作った画像を、1つの大きな画像として扱う描画オブジェクト
// - Entity
//     DOM上で表示する実体を持ったオブジェクト
// - Scene
//     描画オブジェクトを貼りつけることのできる画面オブジェクト
// - Group
//     複数の描画オブジェクトを一つにまとめるオブジェクト
// - Surface
//     画像や図形のデータを保持するオブジェクト
// - Node
//     表示オブジェクトツリーに属するオブジェクトの基底のオブジェクト
// - Core
//     ゲームの画面やメインループ、シーンを管理するオブジェクト
// - EventTarget
//     イベントリスナを管理するオブジェクト
// - Sound
//     サウンドを管理するオブジェクト
//
// 継承ツリー: EventTarget > Core > Node > Entity(> Sprite = Label = Map) = (Group > Scene) = Surface

enchant();

window.onload = function() {
    core = new Core(1920, 1080);

    core.fps = 60;
    // スペースを押すと、yが下がる！(上に行く)
    core.keybind(32, 'a');
    // シフトを押すと、yが上がる！(下に行く)
    core.keybind(16, 'b');
    // 一つのボタンに一つのキーではなく、複数のキーを割り当てることができる
    core.keybind(18, 'b');
    // 一応対応はしてるが、その後バグる
    //   syntax:  .keybind(ASCII_keyNumber, target_buttonName)
    //   support: 'left', 'right', 'up', 'down', 'a', 'b'
    // core.keybind(18, 'c');
    core.preload('takara2314.png');

    core.onload = function() {
        var player = new Sprite(128, 128);
        player.image = core.assets['takara2314.png'];
        core.rootScene.addChild(player);

        // tickプロパティを新規に作成
        player.tick = 0;

        // enterframe でキーボードの検知
        player.addEventListener('enterframe', function(e) {
            if (core.input.left) {
                this.x -= 4;
            }
            if (core.input.right) {
                this.x += 4;
            }
            if (core.input.up) {
                this.y -= 4;
            }
            if (core.input.down) {
                this.y += 4;
            }
            if (core.input.a) {
                this.y -= 16;
            }
            if (core.input.b) {
                this.y += 16;
            }
            // if (core.input.c) {
            //     this.x += 16;
            // }
            if (core.input.left && core.input.right) {
                this.frame = this.tick % 4;
                // 最後にインクリメント
                this.tick++;
            }
        });

        // touchmove でタッチの検知(ドラッグの検知)
        player.addEventListener('touchmove', function(e) {
            // □□□□
            // □□□□
            // □□□□
            // □□□■
            // オブジェクトの右下がe.xとe.yの座標になってる
            this.x = e.x - this.width / 2;
            this.y = e.y - this.height / 2;
        });
    }

    var infoLabel = new Label('YESTERDAY GAME');
    infoLabel.x = 16;
    infoLabel.y = 16;
    infoLabel.color = '#0000FF';
    infoLabel.font = '28px sans-serif';
    core.rootScene.addChild(infoLabel);

    // var infoLabel = new Label('TAKARAN');
    // infoLabel.x = 16;
    // infoLabel.y = 16;
    // infoLabel.color = '#FF0000';
    // infoLabel.font = '28px sans-serif';
    // core.rootScene.addChild(infoLabel);

    core.start();
}