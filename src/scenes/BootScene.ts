export class BootScene extends Phaser.Scene {
    private loadingBar!: Phaser.GameObjects.Graphics;
    private loadingText!: Phaser.GameObjects.Text;
    private loadingPercent: number;
    private progressBar!: Phaser.GameObjects.Graphics;
    private loadingAsset!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'BootScene' });

        this.loadingPercent = 0;
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x98d687);
        this.createLoadingBar();

        // this.loadingText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `${this.loadingPercent}%`).setOrigin(0.5, 0.5)
        this.loadingText = this.make.text({
            x: this.sys.canvas.width / 2,
            y: this.sys.canvas.height / 2 - 50,
            text: 'Loading... 0%',
            style: {
                font: '20px monospace',
                color: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.loadingAsset = this.make.text({
            x: this.sys.canvas.width / 2,
            y: this.sys.canvas.height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.progressBar = this.add.graphics();
        this.load.on(
            'progress',
            (value: number) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0xfff6d3, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 8,
                    (this.cameras.main.width / 2) * value,
                    16
                );
                this.loadingPercent = Math.floor(100 * value);
                this.loadingText.setText(`Loading... ${this.loadingPercent}%`);
            },
            this
        );

        this.load.on(
            'complete',
            () => {
                this.progressBar.destroy();
                this.loadingBar.destroy();
                this.loadingText.destroy();
                this.loadingAsset.destroy();
            },
            this
        )

        this.load.on('fileprogress', (file: any) => {
            this.loadingAsset.setText(`Loading asset: ${file.key}`)
        });

        // will automacally emit complete and progress when load queue finish
        this.load.multiatlas('trex', './assets/trex.json', './assets');
        this.load.pack('preload'/*section*/, './assets/pack.json', 'preload');
        this.load.audio('jump', 'assets/trex/sounds/jumpsound.mp3');
        this.load.audio('die', 'assets/trex/sounds/diesound.mp3');
    }

    update(): void {
        this.scene.start('MainMenuScene');
    }

    private createLoadingBar(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0x5dae47, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 10,
            this.cameras.main.width / 2 + 4,
            20
        );
    }
}