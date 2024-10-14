import { Collision } from "./Collision.js";

export class CollisionShape {
    constructor(x,y,w,h,a) {
        this.Collision=Collision
        this.pos={
            x:x,
            y:y
        }
        this.size={
            width: w,
            height: h
        }
        this.angle=a
    }
    update(x,y,w,h,a){
        this.pos={
            x:x,
            y:y
        }
        this.size={
            width: w,
            height: h
        }
        this.angle=a
    }
    verifyCollision(x,y,w,h,a){
        return this.Collision.isCollidingRect(
            { 
                x: this.pos.x, 
                y: this.pos.y, 
                width: this.size.width, 
                height: this.size.height, 
                angle: this.angle 
            },
            { 
                x: x, 
                y: y, 
                width: w, 
                height: h, 
                angle: a 
            }
            
        )
    }
    draw(ctx, color){
        // ctx.save(); 
        // ctx.translate(this.pos.x, this.pos.y); 
        // ctx.rotate(this.angle); 
        // ctx.translate(-this.size.width / 2, -this.size.height / 2); 
        // ctx.strokeStyle = color;
        // ctx.strokeRect(0, 0, this.size.width, this.size.height);
        // ctx.restore(); 
    }
}