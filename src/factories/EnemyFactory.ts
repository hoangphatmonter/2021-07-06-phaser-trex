import { IEnemyCreate } from "../interfaces/enemyFactoryCreate.interface";
import { Bird } from "../objects/enemies/Bird";
import { Cactus } from "../objects/enemies/Cactus";
import { Enemy } from "../objects/enemies/Enemy";

export abstract class EnemyFactory {
    constructor() { }

    protected abstract create(params: IEnemyCreate): Enemy;
}

export class BirdCactusFactory extends EnemyFactory {
    constructor() {
        super();
    }

    public create(params: IEnemyCreate) {
        if (Math.random() < 0.7) {
            return new Cactus(params, 'trex');
        }
        else
            return new Bird(params, 'trex');
    }
}