import { IEnemyCreate } from "../../interfaces/enemyFactoryCreate.interface";
import { Enemy } from "./Enemy";

export class Bird extends Enemy {
    body!: Phaser.Physics.Arcade.StaticBody;

    constructor(params: IEnemyCreate, texture: string) {
        super(params, texture);

        this.scene.physics.world.enable(this);
        this.body.immovable = true;

        this.scene.add.existing(this);
        // add animation
        this.scene.anims.create({
            key: 'bird-fly',
            frames: this.scene.anims.generateFrameNames('trex', {
                start: 1, end: 2, zeroPad: 4, prefix: 'bird/fly/', suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        });
        this.play('bird-fly', true);
        this.body.setSize(undefined, this.displayHeight / 2, true);
    }

    override update(time: number, delta: number) {
        this.x -= 300 * delta / 1000;
    }
}