class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('button', './assets/bootScene/start_btn.png');
        this.load.image('background', './assets/parkings/parking-battail.svg');
        this.load.audio('menuMusic', ['./assets/sounds/menu_music.ogg']);
    }

    create() {
        this.sound.pauseOnBlur = false;
        const music = this.sound.add('menuMusic');
        music.play();
        let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setScale(0.5);

        let startButton = this.add.image(560, 340, 'button').setInteractive();
        startButton.on('pointerdown', () => {
            music.stop();
            this.scene.start('MainScene');
        });

        this.add.text(325, 175, 'Welcome to the Parking Game!', { fontSize: '32px', fill: '#FFFF00' });
        this.add.text(375, 450, 'Click the button to start', { fontSize: '24px', fill: '#FFFF00' });

        this.createMuteButton();
    }

    createMuteButton() {
        const muteButton = this.add.text(16, 16, 'Mute', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.sound.mute) {
                    this.sound.mute = false;
                    muteButton.setText('Mute');
                } else {
                    this.sound.mute = true;
                    muteButton.setText('Unmute');
                }
            });
        muteButton.setScrollFactor(0); // Keeps the button in a fixed position
    }
}
