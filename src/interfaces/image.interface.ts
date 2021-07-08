export interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    w?: number;
    h?: number;
    frame?: string | number;
}
