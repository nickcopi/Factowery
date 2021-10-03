class Enemy{
	static WIDTH = 10;
	static HEIGHT = 20;
	constructor(x,y){
		this.width = Enemy.WIDTH;
		this.height = Enemy.HEIGHT;
		this.x=x;
		this.y=y;
		this.speed = 0.1;
		this.health = 1;
	}
	move(){
		this.x -= this.speed;
	}
	render(ctx){
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}
