class Gun extends Building{
	static NAME = 'Gun';
	static COST = 15;
	static DESCRIPTION = 'Receives ammunition and fires it eastbound.'
	static SPEED = 50;
	constructor(parentTile){
		super(parentTile,Gun.NAME,Gun.COST,Gun.DESCRIPTION,Gun.SPEED);
		this.ammo = 0;
		this.barrelMod = 0;
		this.barrelSign = 1;
	}
	use(turn){
		if(turn%this.speed !== 0) return;
		//drill
	}
	acceptsType(type){
		if(type === TileType.WEAPON) return true;
		return false;
	}
	addItem(item){
		if(item.type !== TileType.WEAPON) return;
		this.ammo++;
	}
	render(ctx,xOffset,yOffset){
		const x = xOffset + this.parentTile.x*this.parentTile.size + (this.parentTile.size*.15);
		const y = yOffset + this.parentTile.y*this.parentTile.size + (this.parentTile.size*.15);
		const width = this.parentTile.size*.7;
		const height = this.parentTile.size*.7;
		ctx.strokeStyle='#570861';
		ctx.lineWidth = this.parentTile.size*.15;
		ctx.strokeRect(x,y,width,height);
		let barrelHeight = this.parentTile.size * .25;
		let barrelWidth = this.parentTile.size * .75;
		let barrelXMod = this.barrelMod * (this.parentTile.size*.3);
		let barrelX = x + width/4 + barrelXMod;
		let barrelY = y + height/2 - (barrelHeight/2);
		ctx.strokeRect(barrelX,barrelY,barrelWidth,barrelHeight);
		if(this.ammo){
			this.barrelMod += 0.01 * this.barrelSign;
			if(this.barrelMod > 1 || this.barrelMod < 0) this.barrelSign*=-1;
		}

	}

}
