import { BootScene } from './scenes/BootScene';
// import { GameScene } from './scenes/game-scene';
import { MainMenuScene } from './scenes/MainMenuScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'T Rex',
    version: '1.0',
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, MainMenuScene/*, GameScene*/],
    input: {
        keyboard: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    backgroundColor: '#98d687',
    render: { pixelArt: true, antialias: false }
};
