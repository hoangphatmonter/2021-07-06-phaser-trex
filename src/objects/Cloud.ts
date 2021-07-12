import { IEnvironmentCreate } from "../interfaces/environmentFactoryCreate.interface";

export class Cloud extends Phaser.GameObjects.Sprite {

    constructor(aParams: IEnvironmentCreate, y: number, scale: number) {
        super(aParams.scene, aParams.scene.sys.canvas.width, y, 'trex');

        // image
        this.setOrigin(0, 0);

        this.setTexture('trex', `cloud/0001.png`);
        this.setScale(scale, scale);
        this.scene.add.existing(this);
    }

    update(time: number, delta: number): void {
        this.x -= this.scene.registry.values.gamespeed * 2 / 3 * delta / 1000;
    }

    public outOfScene() {
        if (this.displayWidth + this.x < 0)
            return true;
        return false;
    }
}