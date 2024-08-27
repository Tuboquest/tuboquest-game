var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 640,
    backgroundColor: '#000000',
    parent: 'gameContainer',
    dom: { createContainer: true },
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: [BootScene, MainScene, EpiScene, CrenauScene, VictoryScene]
};

const game = new Phaser.Game(config);
