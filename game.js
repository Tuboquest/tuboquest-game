var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 675,
    backgroundColor: '#000000',
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

var player;
var zones = [];
var score = 0;

var carSpeed = 0;
var staticFriction = 0.1;
var steeringDirection = 0;

function preload() {
    this.load.image('car', './assets/cars/car_n_0.png');
    this.load.image('car1', './assets/cars/car_n_1.png');
    this.load.image('car2', './assets/cars/car_n_15.png');
    this.load.image('car3', './assets/cars/car_n_16.png');
    this.load.image('epi', './assets/parkings/parking-epi.svg');
    this.load.image('battail', './assets/parkings/parking-battail.svg');
    this.load.image('crenau', './assets/parkings/parking-crenau.svg');
    this.load.image('zone', './assets/parkings/zone.png');
}

function create() {
    this.matter.world.setBounds().disableGravity();
    cursors = this.input.keyboard.createCursorKeys();

    let background  = this.add.sprite(500, 340, 'battail');
    background.setDisplaySize(background.width / 2, background.height / 2);

    player = this.matter.add.image(100, 385, 'car');

    player.setDepth(99);

    player.setBody({
        type: 'rectangle',
        width: 70,
        height: 175
    });

    player.setAngle(90);

    createZone.call(this, 632, 525);
    createZone.call(this, 287, 155);
    createZone.call(this, 980, 155);

    placeDecorCar.call(this, 172, 150);
    placeDecorCar.call(this, 400, 150);
    placeDecorCar.call(this, 520, 150);
    placeDecorCar.call(this, 635, 150);
    placeDecorCar.call(this, 865, 150);
    placeDecorCar.call(this, 520, 525);
    placeDecorCar.call(this, 750, 525);

    scoreText = this.add.text(900, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

    this.matter.world.on('collisionstart', function (event) {
        var pairs = event.pairs;

        for (var i = 0; i < pairs.length; i++) {
            var bodyA = pairs[i].bodyA;
            var bodyB = pairs[i].bodyB;

            var otherBody = bodyA.gameObject === player ? bodyB : bodyA;
            if (!otherBody.gameObject.isZone) {
                carSpeed = 0;
                player.setVelocity(0, 0);
                player.setAngularVelocity(0);
                score -= 5;
                scoreText.setText('Score: ' + score);
            }
        }
    });
}

function createZone(x, y) {
    var zone = this.matter.add.image(x, y, 'zone', null, { isStatic: true, isSensor: true });
    zone.setDisplaySize(107, 203);
    zones.push(zone);
    zone.isZone = true;
}

function placeDecorCar(x, y) {
    var carImages = ['car', 'car1', 'car2', 'car3'];
    var randomImage = carImages[Math.floor(Math.random() * carImages.length)];
    var decorCar = this.matter.add.image(x, y, randomImage, null, { isStatic: true });

    decorCar.setBody({
        type: 'rectangle',
        width: 70,
        height: 175
    });
    decorCar.setStatic(true);
    zones.push(decorCar);
}

function update() {
    const returnDirection = 0.04;
    const returnSpeed = 0.04;

    if (cursors.left.isDown && steeringDirection > -1) {
        steeringDirection -= 0.04;
    }
    if (cursors.right.isDown && steeringDirection < 1) {
        steeringDirection += 0.04;
    }

    if (cursors.right.isUp && cursors.left.isUp) {
        if (steeringDirection > 0) {
            steeringDirection -= returnDirection;
            if (steeringDirection < 0) steeringDirection = 0;
        } else if (steeringDirection < 0) {
            steeringDirection += returnDirection;
            if (steeringDirection > 0) steeringDirection = 0;
        }
    }

    if (cursors.up.isDown && carSpeed < 3) {
        carSpeed += 0.04;
    }

    if (cursors.down.isDown && carSpeed > -1) {
        carSpeed -= 0.16;
    }

    if (cursors.down.isUp && cursors.up.isUp) {
        if (carSpeed > 0) {
            carSpeed -= returnSpeed;
            if (carSpeed < 0) carSpeed = 0;
        } else if (carSpeed < 0) {
            carSpeed += returnSpeed;
            if (carSpeed > 0) carSpeed = 0;
        }
    }

    var speedsquared = (player.body.velocity.x * player.body.velocity.x) + (player.body.velocity.y * player.body.velocity.y);

    if (speedsquared > staticFriction && carSpeed !== 0) {
        player.setAngularVelocity(steeringDirection * 0.05 * Math.exp(-speedsquared / 100));
    } else {
        player.setAngularVelocity(0);
    }

    if (speedsquared > staticFriction) {
        player.setAngularVelocity(steeringDirection * 0.05 * Math.exp(-speedsquared / 100));
    }

    player.setVelocity(Math.sin(player.rotation) * carSpeed, -Math.cos(player.rotation) * carSpeed);

    zones.forEach(zone => {
        if (Phaser.Geom.Rectangle.ContainsRect(zone.getBounds(), player.getBounds())) {
            if (carSpeed === 0) {
                score += 10;
                scoreText.setText('Score: ' + score);
                zone.setPosition(-100, -100);
            }
        }
    });
}
