import { IImageConstructor } from "../interfaces/image.interface";

export class Dino extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    private isCouch: boolean;

    private isDead!: boolean;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        // image
        this.setOrigin(0, 1);

        this.isDead = false;

        this.scene.physics.world.enable(this);
        this.body.setGravityY(2000);
        this.body.setSize(17);
        this.body.setCollideWorldBounds(true);  // a bounds around worlds
        // this.body.bounce.setTo(0.9, 0.9)

        this.isCouch = false;

        this.scene.add.existing(this);

        // animation for dino
        this.scene.anims.create({
            key: 'dino-run',
            frames: this.scene.anims.generateFrameNames('trex', {
                start: 1, end: 2, zeroPad: 4, prefix: 'dino/run/', suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'dino-couch',
            frames: this.scene.anims.generateFrameNames('trex', {
                start: 1, end: 2, zeroPad: 4, prefix: 'dino/couch/', suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        });
    }

    override update(time: number, delta: number): void {
        // if (this.y + this.displayHeight >= this.scene.sys.canvas.height) {
        //     this.isGround = true;
        // }
        // if (this.b)

        if (this.body.onFloor()) {
            if (this.isCouch) {
                this.play('dino-couch', true);
                this.body.setSize();
            }
            else {
                this.play('dino-run', true);
                this.body.setSize(17);
            }
        }
        else if (this.isDead) {
            this.anims.stop();
            this.setTexture('trex', 'dino/die/0001.png');
        }
        else {
            this.anims.stop();
            this.setTexture('trex', 'dino/idle/0001.png');
        }
    }
    public jump(): void {
        if (this.body.onFloor()) {
            this.body.setVelocityY(-750);
        }
    }
    // functions call by input handler
    public couch(): void {
        if (!this.isCouch) {
            if (!this.body.onFloor())   // if on air
                this.body.velocity.y += 500;
            this.isCouch = true;
        }
    }
    public unCouch(): void {
        this.isCouch = false;
    }
    public die(): void {
        this.isDead = true;
    }
}