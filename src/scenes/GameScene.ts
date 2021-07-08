import { VoidExpression } from "../../node_modules/typescript/lib/typescript";
import { Dino } from "../objects/Dino";
import { Ground } from "../objects/Ground";
import { CouchCommand, JumpCommand, UnCouchCammand } from "./input-helper/command";
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
        this.inputHelperInstance.setCouchCommand(new CouchCommand(this.dino));
        this.inputHelperInstance.setUnCouchCommand(new UnCouchCammand(this.dino));

        this.ground = new Ground({ scene: this, x: 0, y: this.sys.canvas.height - 20, texture: 'trex', frame: 'ground/0001.png', w: this.sys.canvas.width, h: 13 });

        // add collider between dino and ground
        this.physics.add.collider(this.dino, this.ground);
    }

    update(time: number, delta: number): void {
        // handle input
        this.evaluateCommands();
        // update dino
        this.dino.update(time, delta);
        // update ground
        this.ground.update(time, delta);
    }

    evaluateCommands(): void {
        let commands = this.inputHelperInstance.handleInput();
        commands.forEach(cmd => {
            cmd.execute();

            if (cmd instanceof JumpCommand)
                console.log('jump');
            else if (cmd instanceof CouchCommand)
                console.log('couch');
        })
    }
}