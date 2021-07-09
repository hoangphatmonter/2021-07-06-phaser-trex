export class GameOverScene extends Phaser.Scene {
    private button!: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(): void {
    }

    create(): void {
        //restart button
        this.button = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'trex', 'button/restart.png');
        this.button.setInteractive();
        this.button.on('pointerdown', () => {
            // this.scene.stop();
            this.scene.start('GameScene');  // shutdown this scene and run choosen one
        });
    }

    update(): void {

    }
}