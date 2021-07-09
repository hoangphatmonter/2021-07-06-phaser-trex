import { IImageConstructor } from "../interfaces/image.interface";

export class Ground extends Phaser.GameObjects.TileSprite {
    body!: Phaser.Physics.Arcade.StaticBody;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.w!, aParams.h!, aParams.texture, aParams.frame);

        // image
        this.setOrigin(0, 0);

        this.scene.physics.world.enable(this);      // assign body to this.body
        this.body.setSize(this.w, this.height / 2);
        this.body.offset.y = this.height;
        this.body.immovable = true;

        this.scene.add.existing(this);
    }

    update(time: number, delta: number): void {
        this.tilePositionX += 300 * delta / 1000;
    }
}