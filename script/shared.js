class ParkingScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.zones = [];
        this.score = 0;
    }

    preload() {
        this.load.image('car', './assets/cars/car_n_0.png');
        this.load.image('car1', './assets/cars/car_n_1.png');
        this.load.image('car2', './assets/cars/car_n_15.png');
        this.load.image('car3', './assets/cars/car_n_16.png');
        this.load.image('zone', './assets/parkings/zone.png');
        this.load.image('epi', './assets/parkings/parking-epi.svg');
        this.load.image('battail', './assets/parkings/parking-battail.svg');
        this.load.image('crenau', './assets/parkings/parking-crenau.svg');
        this.load.audio('hit', ['./assets/sounds/HitSound.ogg']);
        this.load.audio('engine', ['./assets/sounds/engine_rev.ogg']);
        this.load.audio('win', ['./assets/sounds/star.ogg']);
        this.load.audio('loopInGame', ['./assets/sounds/ingame_FunkGameLoop.ogg']);
    }

    createCommon() {
        this.matter.world.setBounds().disableGravity();
        this.cursors = this.input.keyboard.createCursorKeys();
        const collisionSound = this.sound.add('hit');
        const winSound = this.sound.add('win');
        const inGameLoop = this.sound.add('loopInGame', { loop: true });

        this.player = new PlayerCar(this, 100, 385, 'car');
        this.scoreText = this.add.text(850, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#ffffff' });
        inGameLoop.play();

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.gameObject && bodyB.gameObject) {
                if ((bodyA.gameObject.isZone && bodyB.gameObject === this.player.sprite) ||
                    (bodyB.gameObject.isZone && bodyA.gameObject === this.player.sprite)) {
                    if (this.player.speed === 0) {
                        this.updateScore(10);
                        winSound.play();
                        if (bodyA.gameObject.isZone) {
                            bodyA.gameObject.setPosition(-100, -100);
                        } else {
                            bodyB.gameObject.setPosition(-100, -100);
                        }
                    }
                } else {
                    this.player.speed = 0;
                    this.updateScore(-5);
                    collisionSound.play();
                }
            }
        });

        this.createMuteButton();
    }

    updateCommon() {
        this.player.update(this.cursors);

        this.zones.forEach(zone => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.sprite.getBounds(), zone.getBounds())) {
                if (this.player.speed === 0 && Phaser.Geom.Rectangle.ContainsRect(zone.getBounds(), this.player.sprite.getBounds())) {
                    this.updateScore(10);
                    zone.setPosition(-100, -100);
                    this.zones = this.zones.filter(zone => zone.x !== -100 && zone.y !== -100);
                    if (this.zones.length === 0) {
                        if (this.nextScene !== null){
                            this.scene.start(this.nextScene, { score: this.score });
                        } else {
                            this.scene.start('VictoryScene', { score: this.score });
                        }
                    }
                }
            }
        });
    }

    updateScore(amount) {
        this.score += amount;
        this.scoreText.setText('Score: ' + this.score);
    }

    createZone(x, y, angle = 0) {
        var zone = this.matter.add.image(x, y, 'zone', null, { isStatic: true, isSensor: true });
        zone.setDisplaySize(107, 203);
        zone.setAngle(angle);
        this.zones.push(zone);
        zone.isZone = true;
        zone.setDepth(0);
    }

    placeDecorCar(x, y, angle = 0) {
        var carImages = ['car', 'car1', 'car2', 'car3'];
        var randomImage = carImages[Math.floor(Math.random() * carImages.length)];
        var decorCar = this.matter.add.image(x, y, randomImage, null, { isStatic: true });

        decorCar.setBody({
            type: 'rectangle',
            width: 70,
            height: 175
        });
        decorCar.setStatic(true);
        decorCar.setAngle(angle);
        decorCar.isObstacle = true;
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
        muteButton.setScrollFactor(0);
    }
}
