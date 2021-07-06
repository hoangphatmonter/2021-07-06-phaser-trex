export class BootScene extends Phaser.Scene {
    private loadingBar!: Phaser.GameObjects.Graphics;
    private progressBar!: Phaser.GameObjects.Graphics;
    private loadingPercent: number;

    constructor() {
        super({ key: 'BootScene' });

        this.loadingPercent = 0;
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x98d687);
        this.createLoadingBar();

        this.load.on(
            'progress',
            (value: number) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0xfff6d3, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        this.load.on(
            'complete',
            () => {
                this.progressBar.destroy();
                this.loadingBar.destroy();
            },
            this
        )

        // will automacally emit complete and progress when load queue finish
        this.load.multiatlas('trex', './assets/trex.json', './assets');
        this.load.pack('preload'/*section*/, './assets/pack.json', 'preload');
    }

    update(): void {
        // if (this.loadingPercent < 1) {
        //     this.loadingPercent += 0.01;
        //     this.load.emit('progress', this.loadingPercent);
        // }
        // else
        //     this.load.emit('complete');
        this.scene.start('MainMenuScene');
    }

    private createLoadingBar(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0x5dae47, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }
}