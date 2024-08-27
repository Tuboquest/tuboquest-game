class EpiScene extends ParkingScene {
    constructor() {
        super({ key: 'EpiScene' });
        this.nextScene = 'CrenauScene';
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        this.createCommon();
        let background = this.add.sprite(500, 340, 'epi');
        background.setDisplaySize(background.width / 2, background.height / 2);

        this.placeDecorCar(220, 150, -18);
        this.placeDecorCar(475, 150, -18);
        this.placeDecorCar(740, 150, -18);
        this.placeDecorCar(350, 530, 18);
        this.placeDecorCar(615, 530, 18);
        this.placeDecorCar(880, 530, 18);

        this.createZone(352, 155, -18);
        this.createZone(617, 155, -18);
        this.createZone(882, 155, -18);
        this.createZone(220, 530, 18);
        this.createZone(482, 530, 18);
        this.createZone(747, 530, 18);
    }

    update() {
        this.updateCommon();
    }
}
