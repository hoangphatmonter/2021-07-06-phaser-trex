import { VoidExpression } from "../../node_modules/typescript/lib/typescript";
import { BirdCactusFactory, EnemyFactory } from "../factories/EnemyFactory";
import { Dino } from "../objects/Dino";
import { Enemy } from "../objects/enemies/Enemy";
import { Ground } from "../objects/Ground";
import { CouchCommand, JumpCommand, UnCouchCammand } from "./input-helper/command";
import { InputHelper } from "./input-helper/input-helper";

export class GameScene extends Phaser.Scene {
    private dino!: Dino;
    private ground!: Ground;
    private scoreText!: Phaser.GameObjects.BitmapText;

    private enemyFactory!: BirdCactusFactory;
    private enemies!: Phaser.GameObjects.Group;

    private spawnTime!: number;

    //Input helper
    private inputHelperInstance!: InputHelper;

    constructor() {
        super({ key: 'GameScene' });
    }

    init(): void {
        this.registry.set('score', 0);
        this.spawnTime = this.genCacTime();

        this.inputHelperInstance = new InputHelper(this);

        this.enemyFactory = new BirdCactusFactory();
        this.enemies = this.add.group({ runChildUpdate: true });


    }

    create(): void {
        this.scoreText = this.add
            .bitmapText(
                this.sys.canvas.width / 2 - 14,
                30,
                'font',
                `Score: ${this.registry.values.score} Highscore: 0`
            )
            .setDepth(2).setOrigin(0.5, 0.5);

        this.dino = new Dino({ scene: this, x: 50, y: 100, texture: 'trex', frame: 'dino/idle/0001.png' });
        // set jump for dino
        this.inputHelperInstance.setJumpCommand(new JumpCommand(this.dino));
        this.inputHelperInstance.setCouchCommand(new CouchCommand(this.dino));
        this.inputHelperInstance.setUnCouchCommand(new UnCouchCammand(this.dino));

        this.ground = new Ground({ scene: this, x: 0, y: this.sys.canvas.height - 20, texture: 'trex', frame: 'ground/0001.png', w: this.sys.canvas.width, h: 13 });

        // add collider between dino and ground
        this.physics.add.collider(this.dino, this.ground);
        // add collider with enemy
        this.physics.add.collider(this.dino, this.enemies, this.collisionCallback, this.processCallBack, this);  // default will make it body visible
    }

    update(time: number, delta: number): void {
        // handle input
        this.evaluateCommands();
        // update dino
        this.dino.update(time, delta);
        // update ground
        this.ground.update(time, delta);
        // spawn enemies
        this.spawnTime -= delta;
        if (this.spawnTime < 0) {
            let newEnemy = this.enemyFactory.create({ scene: this, x: this.sys.canvas.width, y: 500 })
            this.enemies.add(newEnemy);

            this.spawnTime = this.genCacTime();
        }
        // delete enemies if out of scene
        for (let i = 0; i < this.enemies.getLength(); i++) {
            let enemy = this.enemies.getChildren()[i];
            if (enemy instanceof Enemy) {
                if (enemy.outOfScene()) {
                    this.enemies.remove(enemy, true, true);
                    i--;
                }
            }
        }
        this.registry.values.score += 1;
        this.scoreText.setText(`Score: ${this.registry.values.score} Highscore: 0`);
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
    genCacTime() {
        return (Math.floor(Math.random() * 2) + 3 - 100 / 100) * 1000; // 3-4s
    }
    collisionCallback(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, obj: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        console.log('Collide with the Pandas!');
    }
    processCallBack(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, obj: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        return true;
    }
}