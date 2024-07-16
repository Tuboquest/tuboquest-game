class PlayerCar {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.matter.add.sprite(x, y, texture);
        this.sprite.setBody({
            type: 'rectangle',
            width: 70,
            height: 175
        });
        this.sprite.setOrigin(0.5, 0.8);
        this.sprite.setAngle(90);
        this.speed = 0;
        this.maxSpeed = 2;
        this.minSpeed = -1;
        this.rotationSpeed = 0.03;
        this.steeringDirection = 0;
    }

    update(cursors) {
        const returnSpeed = 0.02;
        const steeringSpeed = 0.03;
        const returnSteeringSpeed = 0.01;

        // Ajuster la vitesse
        if (cursors.up.isDown) {
            this.speed += 0.04;
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }
        } else if (cursors.down.isDown) {
            this.speed -= 0.04;
            if (this.speed < this.minSpeed) {
                this.speed = this.minSpeed;
            }
        } else {
            if (this.speed > 0) {
                this.speed -= returnSpeed;
                if (this.speed < 0) this.speed = 0;
            } else if (this.speed < 0) {
                this.speed += returnSpeed;
                if (this.speed > 0) this.speed = 0;
            }
        }

        // Ajuster la direction de direction
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

        // Limiter la direction de direction
        this.steeringDirection = Phaser.Math.Clamp(this.steeringDirection, -1, 1);

        // Appliquer la rotation
        this.sprite.rotation += this.steeringDirection * this.rotationSpeed * (this.speed / this.maxSpeed);

        // Mettre à jour la position
        this.sprite.setVelocity(Math.sin(this.sprite.rotation) * this.speed, -Math.cos(this.sprite.rotation) * this.speed);
    }
}