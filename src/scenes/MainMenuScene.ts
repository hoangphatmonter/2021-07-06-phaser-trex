export class MainMenuScene extends Phaser.Scene {
    private startKey!: Phaser.Input.Keyboard.Key;
    private titleBitmapText!: Phaser.GameObjects.BitmapText;
    private playBitmapText!: Phaser.GameObjects.BitmapText;
    private startBtn!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.startKey.isDown = false;
    }

    create(): void {
        //restart button
        this.startBtn = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 100, 'trex', 'button/play.png');
        this.startBtn.displayWidth = 100;
        this.startBtn.displayHeight = 50;

        this.startBtn.setInteractive();
        this.startBtn.on('pointerdown', () => {
            // this.scene.stop();
            this.scene.start('GameScene');  // shutdown this scene and run choosen one
        });

        this.titleBitmapText = this.add.bitmapText(
            0,
            200,
            'font',
            'DINO GAME',
            30
        );

        this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
            this.titleBitmapText.width
        );

        this.playBitmapText = this.add.bitmapText(0, 300, 'font', 'SPACE: PLAY', 25);

        this.playBitmapText.x = this.getCenterXPositionOfBitmapText(
            this.playBitmapText.width
        );
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start('GameScene');
        }
    }

    private getCenterXPositionOfBitmapText(width: number): number {
        return this.sys.canvas.width / 2 - width / 2;
    }
}