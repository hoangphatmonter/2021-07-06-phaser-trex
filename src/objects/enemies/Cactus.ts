import { IEnemyCreate } from "../../interfaces/enemyFactoryCreate.interface";
import { Enemy } from "./Enemy";

export class Cactus extends Enemy {
    body!: Phaser.Physics.Arcade.StaticBody;

    constructor(params: IEnemyCreate, texture: string) {
        super(params, texture);

        let noOfCactus = Math.floor(Math.random() * 10 + 1);  // 1-10
        if (noOfCactus > 9)
            this.setTexture('trex', `cactus/00${noOfCactus}.png`);
        else
            this.setTexture('trex', `cactus/000${noOfCactus}.png`);


        this.scene.physics.world.enable(this);
        this.body.setSize(this.w, this.height);
        this.body.immovable = true;

        this.scene.add.existing(this);
    }

    override update(time: number, delta: number) {
        this.x -= this.scene.registry.values.gamespeed * delta / 1000;
    }
}