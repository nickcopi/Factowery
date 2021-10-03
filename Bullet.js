class Bullet{
	constructor(x,y){
		this.x = x;
		this.y =y;
		this.width = 2;
		this.height = 2;
		this.speed = 2;
	}
	move(){
		this.x++;
	}
	render(ctx){
		ctx.fillStyle = 'black';
		//ctx.fillRect(this.x,this.y,2,2);
		ctx.beginPath();
		ctx.arc(this.x-1, this.y-1,  2, 0, 2 * Math.PI, false);
		ctx.fill();

	}
}
