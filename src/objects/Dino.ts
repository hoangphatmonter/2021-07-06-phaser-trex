import { IImageConstructor } from "../interfaces/image.interface";

export class Dino extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;

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
        this.body.setGravityY(1500);
        this.body.setSize(17, 46);
        this.body.setCollideWorldBounds(true);  // a bounds around worlds
        // this.body.bounce.setTo(0.9, 0.9)

        this.isGround = true;

        this.scene.add.existing(this);
    }

    override update(time: number, delta: number): void {
        if (this.y + this.displayHeight >= this.scene.sys.canvas.height) {
            this.isGround = true;
        }
    }
    public jump(): void {
        if (this.isGround) {
            this.body.setVelocityY(-750);
            this.y -= 10;   // stop update being set ground true after this function
            this.isGround = false;
        }
    }
}