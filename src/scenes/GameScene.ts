import { VoidExpression } from "../../node_modules/typescript/lib/typescript";
import { Dino } from "../objects/Dino";
import { Ground } from "../objects/Ground";
import { JumpCommand } from "./input-helper/command";
import { InputHelper } from "./input-helper/input-helper";

export class GameScene extends Phaser.Scene {
    private dino!: Dino;
    private ground!: Ground;
    private scoreText!: Phaser.GameObjects.BitmapText;

    //Input helper
    private inputHelperInstance!: InputHelper;

    constructor() {
        super({ key: 'GameScene' });
    }

    init(): void {
        this.registry.set('score', 0);

        this.inputHelperInstance = new InputHelper(this);
    }

    create(): void {
        this.scoreText = this.add
            .bitmapText(
                this.sys.canvas.width / 2 - 14,
                30,
                'font',
                this.registry.values.score
            )
            .setDepth(2);

        this.dino = new Dino({ scene: this, x: 50, y: 100, texture: 'trex', frame: 'dino/idle/0001.png' });
        // set jump for dino
        this.inputHelperInstance.setJumpCommand(new JumpCommand(this.dino));

    }

    update(time: number, delta: number): void {
        // handle input
        this.evaluateCommands();
        // update dino
        this.dino.update(time, delta);
    }

    evaluateCommands(): void {
        let commands = this.inputHelperInstance.handleInput();
        commands.forEach(cmd => {
            cmd.execute();

            if (cmd instanceof JumpCommand)
                console.log('jump');
        })
    }
}