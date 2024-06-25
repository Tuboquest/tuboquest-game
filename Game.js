var config = {
    type: Phaser.AUTO,
    width: 1525,
    height: 680,
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
    this.load.path = 'assets/';
    this.load.image('car', 'voiture.svg');
    this.load.image('epi', 'parking-epi.svg');
    this.load.image('battail', 'parking-battail.svg');
    this.load.image('crenau', 'parking-crenau.svg');
    this.load.image('zone', 'zone.png');
}

function create() {
    this.matter.world.setBounds().disableGravity();
    cursors = this.input.keyboard.createCursorKeys();

    this.add.sprite(0, 0, 'battail');

    player = this.matter.add.image(400, 300, 'car');

    player.setBody({
        type: 'rectangle',
        width: 32,
        height: 64
    });

    createZone.call(this, 600, 400);
    createZone.call(this, 800, 400);
    createZone.call(this, 1000, 400);

    scoreText = this.add.text(1300, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
}

function createZone(x, y) {
    var zone = this.add.rectangle(x, y, 45, 75, 0xffff00).setOrigin(0.5); // Fond jaune
    this.matter.add.gameObject(zone, { isStatic: true, isSensor: true }); // Rendre la zone non collidante
    zones.push(zone);
}

function update() {
    const returnDirection = 0.1;
    const returnSpeed = 0.04;

    if (cursors.left.isDown && steeringDirection > -1.5) {
        steeringDirection -= 0.1;
    }
    if (cursors.right.isDown && steeringDirection < 1.5) {
        steeringDirection += 0.1;
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

    if (cursors.up.isDown && carSpeed < 5) {
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

    player.setVelocityX(Math.sin(player.rotation) * carSpeed);
    player.setVelocityY(-Math.cos(player.rotation) * carSpeed);

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
