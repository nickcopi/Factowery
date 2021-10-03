class Drill extends Building{
	static NAME = 'Drill';
	static COST = 10;
	static DESCRIPTION = 'Drills resources and outputs them into a tube.'
	static SPEED = 50;
	constructor(parentTile){
		super(parentTile,Drill.NAME,Drill.COST,Drill.DESCRIPTION,Drill.SPEED);
		this.fuel = 0;
	}
	use(turn){
		if(turn%SPEED !== 0) return;
		//drill
	}
	render(ctx,xOffset,yOffset){
		const x = xOffset + this.parentTile.x*this.parentTile.size + (this.parentTile.size*.15);
		const y = yOffset + this.parentTile.y*this.parentTile.size + (this.parentTile.size*.15);
		const width = this.parentTile.size*.7;
		const height = this.parentTile.size*.7;
		ctx.strokeStyle='#ffd700';
		ctx.lineWidth = this.parentTile.size*.15;
		ctx.strokeRect(x,y,width,height);
		ctx.lineWidth = this.parentTile.size*.075;
		ctx.beginPath();
		let circleX = x+(width/2);
		let circleY = y+(width/2);
		if(this.fuel) circleX += -1.5 + (Math.random()*3);
		if(this.fuel) circleY += -1.5 + (Math.random()*3);
		ctx.arc(circleX, circleY,  ctx.lineWidth*2, 0, 2 * Math.PI, false);
		ctx.stroke();
	}

}
