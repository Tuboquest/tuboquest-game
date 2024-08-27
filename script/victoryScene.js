class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    preload() {
        this.load.html('nameform', 'assets/text/nameform.html');
    }

    create(data) {

        const { score } = data;

        this.add.text(this.cameras.main.centerX, 100, `You Won!`, {
            fontSize: '64px',
            fill: '#ffff00',
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.centerX, 200, `Total Score: ${score}`, {
            fontSize: '48px',
            fill: '#ffffff',
        }).setOrigin(0.5);

        const element = this.add.dom(this.cameras.main.centerX, 400).createFromCache('nameform');
        element.setOrigin(0.5);

        if (!element) {
            console.error('Failed to create form element.');
        } else {
            console.log('Form element created successfully.');
        }

        element.setDepth(9999);

        const scoreField = element.getChildByName('scoreField');
        scoreField.value = score;

        element.addListener('click');

        element.on('click', function (event) {
            if (event.target.name === 'playButton') {
                const inputText = this.getChildByName('nameField');
                if (inputText.value !== '') {
                    this.scene.submitScore(inputText.value, score);
                    this.removeListener('click');
                    this.setVisible(false);
                    this.scene.add.text(this.cameras.main.centerX, 600, `Votre score a bien été enregistré!`, {
                        fontSize: '32px',
                        fill: '#00ff00',
                    }).setOrigin(0.5);
                } else {
                    this.scene.tweens.add({
                        targets: element,
                        alpha: 0.5,
                        duration: 100,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }
        });
    }

    submitScore(name, score) {
        const data = {
            name: name,
            score: score
        };

        console.log(data)

        fetch('https://tuboquest.alexishenry.eu/api/scoreboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Score submitted:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}