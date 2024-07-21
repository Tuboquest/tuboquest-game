class MainScene extends ParkingScene {
    constructor() {
        super({ key: 'MainScene' });
        this.nextScene = 'EpiScene';
    }

    create() {
        this.createCommon();

        let background = this.add.sprite(500, 340, 'battail');
        background.setDisplaySize(background.width / 2, background.height / 2);

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
    }

    update() {
        this.updateCommon()
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
        decorCar.isObstacle = true;
    }
}