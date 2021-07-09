import { IEnemyCreate } from "../interfaces/enemyFactoryCreate.interface";
import { Bird } from "../objects/enemies/Bird";
import { Cactus } from "../objects/enemies/Cactus";
import { Enemy } from "../objects/enemies/Enemy";

export abstract class EnemyFactory {
    constructor() { }

    protected abstract create(params: IEnemyCreate): Enemy;
}

export class BirdCactusFactory extends EnemyFactory {
    private heightToSpawn: number[];
    constructor() {
        super();

        this.heightToSpawn = [400, 500, 550];
    }

    public create(params: IEnemyCreate) {
        if (Math.random() < 0.7) {
            params.y = params.scene.sys.canvas.height - 10;
            return new Cactus(params, 'trex');
        }
        else {
            let idx = Math.floor(Math.random() * this.heightToSpawn.length);
            params.y = this.heightToSpawn[idx];
            return new Bird(params, 'trex');
        }
    }
}