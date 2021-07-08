/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Design patterns: Behavioral design pattern - Command
 *               This is a basic setup handling input in browser games.
 * @license      Digitsensitive
 */

import { Dino } from '../../objects/Dino';
import { Command } from './command.interface';
import { GameObject } from './gameobject';

// export class PauseCommand implements Command {
//   private currentScene: Phaser.Scene;

//   constructor(scene: Phaser.Scene) {
//     this.currentScene = scene;
//   }

//   public execute(): void {
//     this.currentScene.scene.pause();
//     this.currentScene.scene.launch('PauseScene');
//   }
// }

// export class PointerMovedCommand implements Command {
//   private actor: GameObject;
//   private layer: Phaser.Tilemaps.DynamicTilemapLayer;
//   private currentScene: Phaser.Scene;

//   constructor(
//     scene: Phaser.Scene,
//     layer: Phaser.Tilemaps.DynamicTilemapLayer,
//     actor: GameObject
//   ) {
//     this.actor = actor;
//     this.layer = layer;
//     this.currentScene = scene;
//   }

//   public execute(): void {
//     let tile = this.layer.getTileAtWorldXY(
//       this.currentScene.input.activePointer.worldX,
//       this.currentScene.input.activePointer.worldY
//     );

//     this.actor.updatePosition(tile);
//   }
// }

// export class ShootingCommand implements Command {
//   private actor: GameObject;

//   constructor(actor: GameObject) {
//     this.actor = actor;
//   }

//   public execute(): void {
//     this.actor.shoot();
//   }
// }

export class JumpCommand implements Command {
  constructor(
    private dino: Dino
  ) { }

  public execute(): void {
    this.dino.jump();
  }
}

export class CouchCommand implements Command {
  constructor(
    private dino: Dino
  ) { }

  public execute(): void {
    this.dino.couch();
  }
}

export class UnCouchCammand implements Command {
  constructor(
    private dino: Dino
  ) { }

  public execute(): void {
    this.dino.unCouch();
  }
}
