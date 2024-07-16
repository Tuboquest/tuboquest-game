class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.zones = [];
        this.score = 0;
    }

    preload() {
        this.load.image('car', './assets/cars/car_n_0.png');
        this.load.image('car1', './assets/cars/car_n_1.png');
        this.load.image('car2', './assets/cars/car_n_15.png');
        this.load.image('car3', './assets/cars/car_n_16.png');
        this.load.image('epi', './assets/parkings/parking-epi.svg');
        this.load.image('battail', './assets/parkings/parking-battail.svg');
        this.load.image('crenau', './assets/parkings/parking-crenau.svg');
        this.load.image('zone', './assets/parkings/zone.png');
    }

    create() {
        this.matter.world.setBounds().disableGravity();
        this.cursors = this.input.keyboard.createCursorKeys();

        let background = this.add.sprite(500, 340, 'battail');
        background.setDisplaySize(background.width / 2, background.height / 2);

        this.player = new PlayerCar(this, 100, 385, 'car');

        this.placeDecorCar(172, 150);
        this.placeDecorCar(400, 150);
        this.placeDecorCar(520, 150);
        this.placeDecorCar(635, 150);
        this.placeDecorCar(865, 150);
        this.placeDecorCar(520, 525);
        this.placeDecorCar(750, 525);

        this.createZone(287, 155);
        this.createZone(632, 525);
        this.createZone(980, 155);

        this.scoreText = this.add.text(850, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.gameObject && bodyB.gameObject) {
                if (bodyA.gameObject.isZone && bodyB.gameObject === this.player.sprite) {
                    if (this.player.speed === 0) {
                        this.score += 10;
                        this.scoreText.setText('Score: ' + this.score);
                        bodyA.gameObject.setPosition(-100, -100);
                    }
                } else if (bodyB.gameObject.isZone && bodyA.gameObject === this.player.sprite) {
                    if (this.player.speed === 0) {
                        this.score += 10;
                        this.scoreText.setText('Score: ' + this.score);
                        bodyB.gameObject.setPosition(-100, -100);
                    }
                } else {
                    this.player.speed = 0;
                    this.score -= 5;
                    this.scoreText.setText('Score: ' + this.score);
                }
            }
        });

        // Rendre la voiture au-dessus des zones
        this.player.sprite.setDepth(1);
    }

    update() {
        this.player.update(this.cursors);

        this.zones.forEach(zone => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.sprite.getBounds(), zone.getBounds())) {
                if (this.player.speed === 0 && Phaser.Geom.Rectangle.ContainsRect(zone.getBounds(), this.player.sprite.getBounds())) {
                    this.score += 10;
                    this.scoreText.setText('Score: ' + this.score);
                    zone.setPosition(-100, -100);
                }
            }
        });
    }

    createZone(x, y) {
        var zone = this.matter.add.image(x, y, 'zone', null, { isStatic: true, isSensor: true });
        zone.setDisplaySize(107, 203);
        this.zones.push(zone);
        zone.isZone = true;
        zone.setDepth(0); // Mettre la zone derrière la voiture
    }

    placeDecorCar(x, y) {
        var carImages = ['car', 'car1', 'car2', 'car3'];
        var randomImage = carImages[Math.floor(Math.random() * carImages.length)];
        var decorCar = this.matter.add.image(x, y, randomImage, null, { isStatic: true });

        decorCar.setBody({
            type: 'rectangle',
            width: 70,
            height: 175
        });
        decorCar.setStatic(true);
        decorCar.isObstacle = true; // Marquer les voitures décoratives comme obstacles
    }
}