var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 640,
    backgroundColor: '#000000',
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: [BootScene, MainScene, CrenauScene, EipScene]
};

const game = new Phaser.Game(config);
