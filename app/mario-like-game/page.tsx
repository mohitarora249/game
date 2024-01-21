"use client";
import { useEffect, useRef } from "react";

type XYCoord = {
    x: number;
    y: number;
}

type Size = {
    height: number;
    width: number
}

const GRAVITY = 1.5;

class Player {
    private jumpSound = new Audio("/jump.mp3");
    private position: XYCoord;
    velocity: XYCoord;
    private size: Size;
    // private ctx: CanvasRenderingContext2D;
    platforms: Platform[];
    backgrounds: Array<BackgroundObject[]>;

    constructor(platforms: Platform[], backgrounds: Array<BackgroundObject[]>) {
        this.position = {
            x: 200,
            y: 200
        }
        this.size = {
            height: 30,
            width: 30,
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.platforms = platforms;
        this.backgrounds = backgrounds;
        window.addEventListener("keydown", ({ code }) => {
            console.log("code : ", code);
            switch (code) {
                case "ArrowDown": {
                    break;
                }
                case "ArrowUp": {
                    this.jumpSound.play();
                    this.velocity.y -= 20;
                    break;
                }
                case "ArrowLeft": {
                    if (this.position.x > 100) {
                        this.velocity.x = -5;
                    } else {
                        this.velocity.x = 0;
                        this.platforms.forEach((p) => {
                            p.pos.x += 15;
                        });
                        this.backgrounds.forEach((b) => {
                            b.forEach((a) => {
                                a.pos.x += 10;
                            }); 
                        });
                    }
                    break;
                }
                case "ArrowRight": {
                    if (this.position.x < 400) {
                        this.velocity.x = 5;
                    } else {
                        this.velocity.x = 0;
                        this.platforms.forEach((p) => {
                            p.pos.x -= 15;
                        });
                        this.backgrounds.forEach((b) => {
                            b.forEach((a) => {
                                a.pos.x -= 10;
                            }); 
                        });
                    }
                    break;
                }
            }
        });
        window.addEventListener("keyup", ({ code }) => {
            console.log("code : ", code);
            switch (code) {
                case "ArrowDown": {
                    break;
                }
                case "ArrowUp": {
                    this.velocity.y = 0;
                    break;
                }
                case "ArrowLeft": {
                    this.velocity.x = 0;
                    break;
                }
                case "ArrowRight": {
                    this.velocity.x = 0;
                    break;
                }
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.size.height, this.size.width);
    }

    update(ctx: CanvasRenderingContext2D, canvasHeight: number) {
        this.draw(ctx);
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // if player is not touching ground, increase velocity
        if (this.position.y + this.size.height + this.velocity.y <= canvasHeight) this.velocity.y += GRAVITY;
        else this.velocity.y = 0;
    }
    get pos() { return this.position };
    get height() { return this.size.height };
    get width() { return this.size.width };
}

class Platform {
    private position: XYCoord;
    private size: Size;
    private img = new Image();
    constructor(pos: XYCoord) {
        this.img.src = "/platform.png";
        this.position = {
            x: pos.x,
            y: pos.y
        }
        this.size = {
            height: this.img.height,
            width: this.img.width
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.position.x, this.position.y)
    }
    get pos() { return this.position };
    get height() { return this.size.height };
    get width() { return this.size.width };
}

class BackgroundObject {
    private position: XYCoord;
    private size: Size;
    private img = new Image();
    constructor(pos: XYCoord) {
        this.img.src = "/background.png";
        this.position = {
            x: pos.x,
            y: pos.y
        }
        this.size = {
            height: window.innerHeight,
            width: window.innerWidth
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.position.x, this.position.y)
    }
    get pos() { return this.position };
    get height() { return this.size.height };
    get width() { return this.size.width };
}

const platofrmSizes = [
    0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960
]


const MarioLikeGame = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const platforms = platofrmSizes.map(x => new Platform({ x, y: 500 }));
    const backgroundRow = (y: number) => Array(18).fill("_").map((x, i) => new BackgroundObject({ x: i * 62, y }));
    const backgroundObjects: Array<BackgroundObject[]> = Array(8).fill("_").map((_, y) => backgroundRow(y * 62));

    const player = new Player(platforms, backgroundObjects);
    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            // set height and width to full screen
            canvasRef.current.height = 576;
            canvasRef.current.width = 1024;
            animate();
        }
    }, []);

    const animate = () => {
        if (canvasRef && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d")!;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            backgroundObjects.forEach((b) => {
                b.forEach((a: BackgroundObject) => {
                    a.draw(ctx);
                })
            });
            platforms.forEach((p) => {
                p.draw(ctx)
            });
            player.update(ctx, canvasRef.current.height);
            platforms.forEach((platform) => {
                if (
                    player.pos.y + player.height <= platform.pos.y &&
                    player.pos.y + player.height + player.velocity.y >= platform.pos.y &&
                    player.pos.x + player.width >= platform.pos.x &&
                    player.pos.x <= platform.pos.x + platform.width) {
                    player.velocity.y = 0;
                }
            });
            requestAnimationFrame(animate);
        }
    }

    return (
        <div className="bg-black h-screen w-screen flex justify-center">
            <canvas className="bg-white" height={0} width={0} ref={canvasRef} />
        </div>
    )
}

export default MarioLikeGame;