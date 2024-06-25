# tuboquest-game
## Introduction

Ce projet est un jeu de simulation de stationnement de voiture développé avec le framework de jeu Phaser 3. Le jeu met au défi les joueurs de naviguer et de garer une voiture dans des zones désignées tout en évitant les obstacles.

## Fonctionnalités

- **Moteur Physique** : Utilise le moteur physique Matter.js pour un mouvement réaliste de la voiture et la détection des collisions.
- **Contrôles** : Prend en charge les contrôles au clavier pour la direction et les ajustements de vitesse.
- **Système de Score** : Gagnez des points en garant la voiture dans des zones désignées.
- **Zones de Stationnement** : Différentes zones de stationnement que les joueurs doivent atteindre et où ils doivent se garer.
- **Friction Statique** : Implémente un modèle de friction de base pour simuler la dynamique de maniement de la voiture.

## Gameplay
### Objectif

L'objectif du jeu est de garer la voiture dans les zones de stationnement désignées. Chaque stationnement réussi rapporte des points au joueur.

### Contrôles

- Flèches Directionnelles:
    - Flèche Haut: Accélère la voiture vers l'avant.
    - Flèche Bas: Reculer la voiture.
    - Flèche Gauche: Dirige la voiture vers la gauche.
    - Flèche Droite: Dirige la voiture vers la droite.

### Système de Score

Zones de Stationnement: Garez la voiture dans les zones jaunes pour gagner des points.
Chaque stationnement réussi dans une zone rapporte 10 points au joueur.
Le jeu met à jour le score en temps réel et l'affiche à l'écran.

## Comment Exécuter le Jeu

1. Installer Phaser 3: Assurez-vous d'avoir Phaser 3 installé dans votre environnement de développement.
2. Chargement des Ressources: Placez les ressources nécessaires (car.svg, parking-epi.svg, parking-battail.svg, parking-crenau.svg, zone.png) dans un répertoire assets.
3. Configuration du Jeu: La configuration du jeu est définie dans l'objet config, qui inclut la taille du canvas, la couleur de fond, les paramètres du moteur physique et les callbacks de la scène.
4. Initialisation: Créez une nouvelle instance de jeu Phaser avec la configuration spécifiée.
5. Boucle du Jeu:
    - Preload: Chargez tous les assets nécessaires pour le jeu.
    - Create: Initialisez les objets du jeu, y compris la voiture du joueur et les zones de stationnement. Configurez les contrôles au clavier et l'affichage du score.
    - Update: Gérez la logique du jeu, y compris les entrées du joueur, le mouvement de la voiture et la détection des collisions.

## Vue d'Ensemble du Code

### Configuration

``` javascript
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

```

### Variables

``` javascript
var player;
var zones = [];
var score = 0;
var carSpeed = 0;
var staticFriction = 0.1;
var steeringDirection = 0;
```

### Fonction Preload

Charge les ressources nécessaires pour le jeu.
(WIP)
```javascript
function preload() {
    this.load.path = 'assets/';
    this.load.image('car', 'voiture.svg');
    this.load.image('epi', 'parking-epi.svg');
    this.load.image('battail', 'parking-battail.svg');
    this.load.image('crenau', 'parking-crenau.svg');
    this.load.image('zone', 'zone.png');
}

```

## Fonction Create
Initialise les objets du jeu et configure le monde physique.
```javascript
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
```

## Fonction Create Zone

Crée des zones de stationnement aux positions spécifiées.

```javascript
function createZone(x, y) {
    var zone = this.add.rectangle(x, y, 45, 75, 0xffff00).setOrigin(0.5);
    this.matter.add.gameObject(zone, { isStatic: true, isSensor: true });
    zones.push(zone);
}
```

## Fonction Update

Gère les entrées du joueur, le mouvement de la voiture et la détection des collisions.

``` javascript
function update() {
    // Logique de contrôle et de vitesse
    // Met à jour la position et la rotation de la voiture
    // Vérifie la collision avec les zones de stationnement
}
```

## Conclusion

Ce jeu de stationnement de voiture offre une expérience simple mais engageante avec des physiques réalistes et des contrôles réactifs. L'objectif est de garer la voiture dans des zones désignées pour gagner des points, offrant ainsi une expérience de jeu amusante et stimulante.