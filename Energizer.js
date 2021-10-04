class Energizer extends Building{
	static NAME = 'Energizer';
	static COST = 5;
	static DESCRIPTION = 'Energizes a random building on the screen for 5 seconds to make it 2x as fast.'
	static SPEED = 16;
	constructor(parentTile){
		super(parentTile,Energizer.NAME,Energizer.COST,Energizer.DESCRIPTION,Energizer.SPEED);
		this.energy = 0;
	}
	use(turn,tileMap){
		if(turn%this.getSpeed(turn) !== 0) return;
		if(!this.energy) return;
		const targets = tileMap.buildings.filter(building=>!building.isEnergized(turn));
		if(!targets.length) return;
		targets[Math.floor(Math.random()*targets.length)].energized = turn + 80;
		this.energy--;
	}
	acceptsType(type){
		if(type === TileType.ENERGY) return true;
		return false;
	}
	addItem(item){
		if(item.type !== TileType.ENERGY) return;
		this.energy++;
	}
	renderSpecific(ctx,xOffset,yOffset,fromMenu){
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
