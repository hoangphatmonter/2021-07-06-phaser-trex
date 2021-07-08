import { IEnemyCreate } from "../../interfaces/enemyFactoryCreate.interface";

export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(params: IEnemyCreate, texture: string) {
        super(params.scene, params.x, params.y, texture);
        this.initTile();
    }
    private initTile(): void {
        this.setOrigin(0, 1);
    }
}