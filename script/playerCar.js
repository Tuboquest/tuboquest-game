class PlayerCar {
    engineSound;
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.matter.add.sprite(x, y, texture);

        this.sprite.setBody({
            type: 'rectangle',
            width: 70,
            height: 175,
        });

        this.sprite.setDepth(9);
        this.sprite.setAngle(90);

        this.speed = 0;
        this.maxSpeed = 2;
        this.minSpeed = -1;
        this.rotationSpeed = 0.03;
        this.steeringDirection = 0;
        this.engineSound = this.scene.sound.add('engine', {loop: true})
    }

    update(cursors) {
        const returnSpeed = 0.02;
        const steeringSpeed = 0.03;
        const returnSteeringSpeed = 0.01;

        if (cursors.up.isDown || cursors.down.isDown) {
            this.speed += cursors.up.isDown ? 0.04 : -0.04;
            this.speed = Phaser.Math.Clamp(this.speed, this.minSpeed, this.maxSpeed);

            if (!this.engineSound.isPlaying) {
                this.engineSound.play();
            }
        } else {
            if (this.speed > 0) {
                this.speed -= returnSpeed;
                if (this.speed < 0) this.speed = 0;
            } else if (this.speed < 0) {
                this.speed += returnSpeed;
                if (this.speed > 0) this.speed = 0;
            }

            if (this.speed === 0) {
                this.engineSound.stop();
            }
        }

        if (cursors.left.isDown) {
            this.steeringDirection -= steeringSpeed;
        } else if (cursors.right.isDown) {
            this.steeringDirection += steeringSpeed;
        } else {
            if (this.steeringDirection > 0) {
                this.steeringDirection -= returnSteeringSpeed;
                if (this.steeringDirection < 0) this.steeringDirection = 0;
            } else if (this.steeringDirection < 0) {
                this.steeringDirection += returnSteeringSpeed;
                if (this.steeringDirection > 0) this.steeringDirection = 0;
            }
        }

        this.steeringDirection = Phaser.Math.Clamp(this.steeringDirection, -1, 1);
        this.sprite.rotation += this.steeringDirection * this.rotationSpeed * (this.speed / this.maxSpeed);
        this.sprite.setVelocity(Math.sin(this.sprite.rotation) * this.speed, -Math.cos(this.sprite.rotation) * this.speed);
    }
}