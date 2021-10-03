class Energizer extends Building{
	static NAME = 'Energizer';
	static COST = 5;
	static DESCRIPTION = 'Energizes a random building on the screen and makes it process faster.'
	static SPEED = 16;
	constructor(parentTile){
		super(parentTile,Energizer.NAME,Energizer.COST,Energizer.DESCRIPTION,Energizer.SPEED);
		this.energy = 0;
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
		ctx.strokeStyle='#3137fd';
		ctx.lineWidth = this.parentTile.size*.15;
		ctx.strokeRect(x,y,width,height);
		ctx.lineWidth = this.parentTile.size*.075;
		if(this.energy){
			const shockXMin = x+1;
			const shockXMax = width-1
			const shockYMin = y+1;
			const shockYMax = height-1
			ctx.beginPath();
			ctx.moveTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.lineTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.lineTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.lineTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.stroke();
		}

	}

}
