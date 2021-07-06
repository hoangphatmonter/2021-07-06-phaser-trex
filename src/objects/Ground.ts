import { IImageConstructor } from "../interfaces/image.interface";

export class Ground extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        // image
        this.setOrigin(0, 0);

        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.setSize(17, 12);

        this.scene.add.existing(this);
    }

    update(): void {

    }
}