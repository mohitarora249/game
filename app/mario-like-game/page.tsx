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
    private position: XYCoord;
    velocity: XYCoord;
    private size: Size;
    // private ctx: CanvasRenderingContext2D;

    constructor() {
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
        window.addEventListener("keydown", ({ code }) => {
            console.log("code : ", code);
            switch(code) {
                case "ArrowDown": {
                    break;
                }
                case "ArrowUp": {
                    this.velocity.y -= 20;
                    break;
                }
                case "ArrowLeft": {
                    this.velocity.x = -5;
                    break;
                }
                case "ArrowRight": {
                    this.velocity.x = 5;
                    break;
                }
            }
        });
        window.addEventListener("keyup", ({ code }) => {
            console.log("code : ", code);
            switch(code) {
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

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.size.height, this.size.width);
    }

    update(ctx: CanvasRenderingContext2D, canvasHeight: number){
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
    constructor() {
        this.position = {
            x: 400,
            y: 700
        }
        this.size = {
            height: 20,
            width: 200,
        }
    }
    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
    get pos() { return this.position };
    get height() { return this.size.height };
    get width() { return this.size.width };
}

const MarioLikeGame = () => {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const player = new Player();
    const platform = new Platform();
    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            // set height and width to full screen
            canvasRef.current.height = window.innerHeight;
            canvasRef.current.width = window.innerWidth;
            animate();
        }
    }, []);

    const animate = () => {
        if (canvasRef && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d")!;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            requestAnimationFrame(animate);
            player.update(ctx, canvasRef.current.height);
            platform.draw(ctx);


            if (
                player.pos.y + player.height <= platform.pos.y && 
                player.pos.y + player.height + player.velocity.y >= platform.pos.y && 
                player.pos.x + player.width >= platform.pos.x && 
                player.pos.x <= platform.pos.x + platform.width) {
                player.velocity.y = 0;
            }
        }
    }

    return (
        <canvas height={0} width={0} ref={canvasRef} />
    )
}

export default MarioLikeGame;