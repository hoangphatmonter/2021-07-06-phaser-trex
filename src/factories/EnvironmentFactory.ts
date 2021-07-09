import { GameObjects } from "phaser";
import { IEnvironmentCreate } from "../interfaces/environmentFactoryCreate.interface";
import { IImageConstructor } from "../interfaces/image.interface";
import { Cloud } from "../objects/Cloud";

export abstract class EnvironmentFactory {
    constructor() { }

    protected abstract create(params: IImageConstructor): GameObjects.Sprite;
}

export class CloudFactory extends EnvironmentFactory {
    constructor() {
        super();
    }

    public create(params: IEnvironmentCreate) {
        let y = params.scene.sys.canvas.height - Math.floor(Math.random() * 300 + 100);
        let scale = Math.random() * 3 + 1;
        return new Cloud(params, y, scale);
    }
}