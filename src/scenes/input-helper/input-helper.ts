/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Design patterns: Behavioral design pattern - Command
 *               Input Helper
 * @license      Digitsensitive
 */

import { Input } from 'phaser';
import { Command } from './command.interface';

export class InputHelper {
  // Refrence to the current game scene
  private currentScene: Phaser.Scene;

  // Commands
  // private pauseScene!: Command;
  // private pointerMoved!: Command;
  private jump!: Command;
  private couch!: Command;
  private unCouch!: Command;

  // Key
  private s: Input.Keyboard.Key;
  private w: Input.Keyboard.Key;
  private space: Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    this.currentScene = scene;

    this.s = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.w = this.currentScene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
    this.space = this.currentScene.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
  }

  // /**
  //  * Set the pause scene command
  //  * @param command
  //  */
  // public setPauseSceneCommand(command: Command): void {
  //   this.pauseScene = command;
  // }

  // /**
  //  * Set the pointer moved command
  //  * @param command
  //  */
  // public setPointerMovedCommand(command: Command): void {
  //   this.pointerMoved = command;
  // }

  /**
   * Set the shooting command
   * @param command
   */
  public setJumpCommand(command: Command): void {
    this.jump = command;
  }

  public setCouchCommand(command: Command): void {
    this.couch = command;
  }

  public setUnCouchCommand(command: Command): void {
    this.unCouch = command;
  }

  /**
   * Main function of the input helper
   * Returns commands if corresponding key is pressed
   * It can't execute the commands immediately, because it doesn't know what
   * receiver (= actor) to pass in
   */
  public handleInput(): Command[] {
    let listOfCmd = [];

    // if (
    //   Phaser.Input.Keyboard.JustDown(
    //     this.currentScene.input.keyboard.addKey('P')
    //   )
    // ) {
    //   return this.pauseScene;
    // } else if (
    //   this.currentScene.input.activePointer.prevPosition.x !==
    //   this.currentScene.input.activePointer.position.x ||
    //   this.currentScene.input.activePointer.prevPosition.y !==
    //   this.currentScene.input.activePointer.position.y
    // ) {
    //   return this.pointerMoved;
    // } else 
    if (Phaser.Input.Keyboard.JustDown(this.space) ||
      Phaser.Input.Keyboard.JustDown(this.w))
      listOfCmd.push(this.jump);
    else if (Phaser.Input.Keyboard.JustDown(this.s))
      listOfCmd.push(this.couch);
    else if (Phaser.Input.Keyboard.JustUp(this.s))
      listOfCmd.push(this.unCouch);

    return listOfCmd;
  }
}
