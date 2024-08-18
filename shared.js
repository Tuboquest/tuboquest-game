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
    }

    createCommon() {
        this.matter.world.setBounds().disableGravity();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new PlayerCar(this, 100, 385, 'car');
        this.scoreText = this.add.text(850, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#ffffff' });

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.gameObject && bodyB.gameObject) {
                if ((bodyA.gameObject.isZone && bodyB.gameObject === this.player.sprite) ||
                    (bodyB.gameObject.isZone && bodyA.gameObject === this.player.sprite)) {
                    if (this.player.speed === 0) {
                        this.updateScore(10);
                        console.log(this.zones)
                        if (bodyA.gameObject.isZone) {
                            bodyA.gameObject.setPosition(-100, -100);
                        } else {
                            bodyB.gameObject.setPosition(-100, -100);
                        }
                    }
                } else {
                    this.player.speed = 0;
                    this.updateScore(-5);
                }
            }
        });
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
                        if (this.nextScene) {
                            this.scene.start(this.nextScene, { score: this.score });
                        }else {
                            const message = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Vous avez gagné !\nScore total: ${this.score}`, {
                                fontSize: '64px',
                                fill: '#ffff00'
                            });
                            message.setOrigin(0.5, 0.5);
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
}
