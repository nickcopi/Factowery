class Scrapper extends Building{
	static NAME = 'Scrapper';
	static COST = 5;
	static DESCRIPTION = 'Refines junk scrap into usable scrap.'
	static SPEED = 25;
	constructor(parentTile){
		super(parentTile,Scrapper.NAME,Scrapper.COST,Scrapper.DESCRIPTION,Scrapper.SPEED);
		this.fuel = 1;
		this.scrap = 0;
		this.crusherMod = 0;
		this.crusherSign = 1;
	}
	use(turn,tileMap,wallet){
		if(turn%this.getSpeed(turn) !== 0) return;
		if(!this.fuel || !this.scrap) return;
		this.fuel--;
		this.scrap--;
		wallet.scrap ++;
	}
	acceptsType(type){
		if(type === TileType.FUEL) return true;
		if(type === TileType.SCRAP) return true;
		return false;
	}
	addItem(item,from){
		if(item.type === TileType.FUEL){
			this.fuel++;
		}
		if(item.type === TileType.SCRAP){
			this.scrap++;
		}
	}
	renderSpecific(ctx,xOffset,yOffset,fromMenu){
		const x = xOffset + this.parentTile.x*this.parentTile.size + (this.parentTile.size*.15);
		const y = yOffset + this.parentTile.y*this.parentTile.size + (this.parentTile.size*.15);
		const width = this.parentTile.size*.7;
		const height = this.parentTile.size*.7;
		ctx.strokeStyle='green';
		ctx.lineWidth = this.parentTile.size*.15;
		ctx.strokeRect(x,y,width,height);
		ctx.lineWidth = this.parentTile.size*.075;
		let crusherHeight = 1;
		let crusherWidth = this.parentTile.size * .5;
		let crusherYMod = this.crusherMod * (this.parentTile.size*.3);
		let crusherX = x + (width/2 - crusherWidth/2);
		let crusherY = y + this.parentTile.size *.2 + crusherYMod;
		ctx.strokeRect(crusherX,crusherY,crusherWidth,crusherHeight);
		if(this.fuel && this.scrap){
			this.crusherMod += 0.01 * this.crusherSign;
			if(this.crusherMod > 1 || this.crusherMod < 0) this.crusherSign*=-1;
		}
	}

}
