import { IEnemyCreate } from "../../interfaces/enemyFactoryCreate.interface";
import { Enemy } from "./Enemy";

export class Cactus extends Enemy {
    body!: Phaser.Physics.Arcade.StaticBody;

    constructor(params: IEnemyCreate, texture: string) {
        super(params, texture);

        this.setTexture('trex', 'cactus/0001.png');

        this.scene.physics.world.enable(this);
        this.body.setSize(this.w, this.height);
        this.body.immovable = true;

        this.scene.add.existing(this);
    }

    override update(time: number, delta: number) {
        this.x -= 100 * delta / 1000;
    }
}