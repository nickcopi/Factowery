class Tube extends Building{
	static NAME = 'Tube';
	static COST = 1;
	static DESCRIPTION = 'Tubes allow the movement of items through them in all directions.'
	static SPEED = 3;
	constructor(parentTile){
		super(parentTile,Tube.NAME,Tube.COST,Tube.DESCRIPTION,Tube.SPEED);
		this.items = [];
	}
	use(turn,tileMap){
		if(turn%this.speed !== 0) return;
		//move items
		const itemSpeed = this.parentTile.size*.1;
		const itemSize = this.getItemSize();
		this.items = this.items.filter(item=>{
			item.x += itemSpeed * item.xDir;
			item.y += itemSpeed * item.yDir;
			let result;
			let checkNeighbors = false;
			if(item.xDir === 1 && item.x > this.parentTile.size/2) checkNeighbors = true;
			if(item.xDir === -1 && item.x < this.parentTile.size/2) checkNeighbors = true;
			if(item.yDir === 1 && item.y > this.parentTile.size/2) checkNeighbors = true;
			if(item.yDir === -1 && item.y < this.parentTile.size/2) checkNeighbors = true;
			if(item.x > this.parentTile.size) result = this.dumpFromTube(this.parentTile.x+1,this.parentTile.y,tileMap,item);
			else if(item.x < -itemSize) result = this.dumpFromTube(this.parentTile.x-1,this.parentTile.y,tileMap,item);
			else if(item.y > this.parentTile.size) result = this.dumpFromTube(this.parentTile.x,this.parentTile.y+1,tileMap,item);
			else if(item.y < -itemSize) result = this.dumpFromTube(this.parentTile.x,this.parentTile.y-1,tileMap,item);
			if(result) return false;
			if(checkNeighbors){
				const neighbor = this.getNeighbor(tileMap,item.type,item);
				if(!neighbor) return false;
				const xDiff = this.parentTile.x - neighbor.parentTile.x;
				const yDiff = this.parentTile.y - neighbor.parentTile.y;
				item.xDir = -xDiff;
				item.yDir = -yDiff;
			}
			return true;
		});
		//item.x 
	}
	//attempts to dump from a tube into whatever is aimed at (false if no dump, true if dumped)
	dumpFromTube(x,y,tileMap,item){
		const tile = tileMap.getGrid(x,y);
		if(!tile || !tile.building) return false;
		if(!tile.building.acceptsType(item.type)) return false;
		tile.building.addItem(item,this);
		return true;
	}
	acceptsType(type){
		return true;
	}
	getItemSize(){
		return this.parentTile.size*0.3
	}
	addItem(item,from){
		const itemSize = this.getItemSize();
		const xDiff = this.parentTile.x - from.parentTile.x;
		const yDiff = this.parentTile.y - from.parentTile.y;
		item.lastX = from.parentTile.x;
		item.lastY = from.parentTile.y;
		item.xDir = xDiff;
		item.yDir = yDiff;
		if(xDiff === 0 && !item.x)
			item.x = this.parentTile.size/2 - itemSize/2
		if(yDiff === 0 && !item.y)
			item.y = this.parentTile.size/2 - itemSize/2
		if(xDiff === 1)
			item.x = 0;
		if(xDiff === -1)
			item.x = this.parentTile.size-itemSize;
		if(yDiff === 1)
			item.y = 0;
		if(yDiff === -1)
			item.y = this.parentTile.size-itemSize;

		this.items.push(item);
	}
	render(ctx,xOffset,yOffset,fromMenu){
		//draw items inside tube
		if(fromMenu){
			ctx.fillStyle='white';
			ctx.fillRect(xOffset,yOffset,this.parentTile.size,this.parentTile.size);
			this.drawName(ctx,xOffset,yOffset);
		}
		const itemSize = this.getItemSize();
		this.items.forEach(item=>{
			ctx.fillStyle=Constants.TILE_TYPE_COLOR[item.type];
			const x = this.parentTile.x*this.parentTile.size + item.x;
			const y = this.parentTile.y*this.parentTile.size + item.y;
			ctx.fillRect(x,y,itemSize,itemSize);
		});
	}

}
