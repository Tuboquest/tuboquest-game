class CrenauScene extends ParkingScene {
    constructor() {
        super({ key: 'CrenauScene' });
        this.nextScene = null;
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        this.createCommon();
        let background = this.add.sprite(500, 340, 'crenau');
        background.setDisplaySize(background.width / 2, background.height / 2);

        this.placeDecorCar(500, 185, 90);
        this.placeDecorCar(230, 500, 90);
        this.placeDecorCar(740, 500, 90);

        this.createZone(230, 190, 90);
        this.createZone(740, 190, 90);
        this.createZone(490, 495, 90);
    }

    update() {
        this.updateCommon();
    }
}