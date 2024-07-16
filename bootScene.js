class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('button', './assets/bootScene/start_btn.png'); // Add button image
        this.load.image('background', './assets/parkings/parking-battail.svg'); // Add background image
    }

    create() {
        let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setScale(0.5);

        let startButton = this.add.image(560, 340, 'button').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('MainScene');
        });

        this.add.text(325, 175, 'Welcome to the Parking Game!', { fontSize: '32px', fill: '#FFFF00' });
        this.add.text(375, 450, 'Click the button to start', { fontSize: '24px', fill: '#FFFF00' });
    }
}
