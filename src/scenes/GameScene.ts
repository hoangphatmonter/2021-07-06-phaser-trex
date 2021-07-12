import { BirdCactusFactory } from "../factories/EnemyFactory";
import { CloudFactory } from "../factories/EnvironmentFactory";
import { Cloud } from "../objects/Cloud";
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
    private cloudFactory!: CloudFactory;
    private clouds!: Phaser.GameObjects.Group;

    private enemySpawnTime!: number;
    private cloudSpawnTime!: number;

    //Input helper
    private inputHelperInstance!: InputHelper;

    constructor() {
        super({ key: 'GameScene' });

    }

    preload() {
        this.cameras.main.setBackgroundColor(0xffffff);
    }

    init(): void {
        this.registry.set('score', 0);
        if (!this.registry.has('highscore')) {
            this.registry.set('highscore', 0);
        }
        this.registry.set('gamespeed', 300);

        this.inputHelperInstance = new InputHelper(this);

        this.enemySpawnTime = this.genCacTime();
        this.enemyFactory = new BirdCactusFactory();
        this.enemies = this.add.group({ runChildUpdate: true });

        this.cloudSpawnTime = this.genCacTime();
        this.cloudFactory = new CloudFactory();
        this.clouds = this.add.group({ runChildUpdate: true });
    }

    create(): void {
        // this.add.image(0, this.sys.canvas.height - 300, 'trex', 'background/ground.png').setOrigin(0, 1);

        this.scoreText = this.add
            .bitmapText(
                this.sys.canvas.width / 2,
                30,
                'font',
                `S: ${this.registry.values.score} HS: ${this.registry.values.highscore}`,
                20
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

        this.updateEnemies(delta);

        this.updateCloud(delta);

        this.registry.values.score += 1;
        this.registry.values.gamespeed += 0.3;
        this.scoreText.setText(`S: ${this.registry.values.score} HS: ${this.registry.values.highscore}`);
    }

    evaluateCommands(): void {
        let commands = this.inputHelperInstance.handleInput();
        commands.forEach(cmd => {
            cmd.execute();

            if (cmd instanceof JumpCommand) {
                console.log('jump');
            }
            else if (cmd instanceof CouchCommand)
                console.log('couch');
        })
    }
    genCacTime() {
        return (Math.floor(Math.random() * 2) + 3 - this.registry.values.gamespeed / 300) * 1000; // 3-4s
    }
    collisionCallback(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, obj: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        // On game over
        // update highscore
        if (this.registry.values.highscore < this.registry.values.score)
            this.registry.values.highscore = this.registry.values.score;
        this.dino.die();
        this.sound.play('die');
        this.scene.pause(this);
        this.scene.launch('GameOverScene');

        // this.physics.pause();
    }
    processCallBack(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, obj: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        return true;
    }

    updateEnemies(delta: number) {
        // spawn enemies
        this.enemySpawnTime -= delta;
        if (this.enemySpawnTime < 0) {
            let newEnemy = this.enemyFactory.create({ scene: this, x: this.sys.canvas.width, y: 500 })
            this.enemies.add(newEnemy);

            this.enemySpawnTime = this.genCacTime();
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
    }
    updateCloud(delta: number) {
        // spawn cloud
        this.cloudSpawnTime -= delta;
        if (this.cloudSpawnTime < 0) {
            let newCloud = this.cloudFactory.create({ scene: this });
            this.clouds.add(newCloud);

            this.cloudSpawnTime = this.genCacTime();
        }
        // delete cloud
        for (let i = 0; i < this.clouds.getLength(); i++) {
            let cloud = this.clouds.getChildren()[i];
            if (cloud instanceof Cloud) {

                if (cloud.outOfScene()) {
                    this.clouds.remove(cloud, true, true);
                    i--;
                }
            }
        }
    }
}