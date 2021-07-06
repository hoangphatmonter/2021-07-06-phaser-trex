import { IImageConstructor } from "../interfaces/image.interface";

export class Dino extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;

    private jumpKey!: Phaser.Input.Keyboard.Key;
    private isGround: boolean;

    private isDead!: boolean;

    public getDead(): boolean {
        return this.isDead;
    }
    public setDead(dead: boolean): void {
        this.isDead = dead;
    }
    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        // image
        this.setOrigin(0, 0);

        this.isDead = false;

        this.scene.physics.world.enable(this);
        this.body.setGravityY(1000);
        this.body.setSize(17, 12);
        this.body.setCollideWorldBounds(true);

        this.jumpKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.isGround = true;

        this.scene.add.existing(this);
    }

    update(): void {
        if (this.jumpKey.isDown && this.isGround) {
            this.body.setVelocityY(-350);
            this.isGround = false;
        }

        if (this.y + this.height >= this.scene.sys.canvas.height) {
            this.isGround = true;
        }
    }
}