class Building{
	constructor(parentTile,name,cost,description,speed){
		this.parentTile = parentTile;
		this.name = name;
		this.cost = cost;
		this.description = description;
		this.speed = speed;
		this.rotation = 0;
		this.ccw = false;
	}
	setParent(parent){
		this.parentTile = parent;
	}
	getNeighbor(tileMap,typeRestriction,item){
		let x = this.parentTile.x;
		let y = this.parentTile.y;
		let checks = [
			{x:0,y:-1},
			{x:1,y:0},
			{x:0,y:1},
			{x:-1,y:0},
		]
		if(this.ccw) checks = checks.reverse();
		for(let i = 0; i< checks.length;i++){
			const tile = tileMap.getGrid(checks[i].x + x,checks[i].y + y);
			if(!tile || !tile.building) continue;
			if(typeRestriction && !tile.building.acceptsType(typeRestriction))  continue;
			if(item && item.lastX === tile.x && item.lastY === tile.y) continue;
			return tile.building;
		}
	}
	drawName(ctx,xOffset,yOffset){
		const fontSize = Math.floor(this.parentTile.size/2);
		ctx.font = `${fontSize}px Arial`;
		let x = xOffset + (this.parentTile.size/2 -ctx.measureText(this.name).width/2);
		ctx.fillText(this.name,x,yOffset + this.parentTile.size+fontSize*1.2)


		let costStr = `${this.cost} scrap`
		x = xOffset + (this.parentTile.size/2 -ctx.measureText(costStr).width/2);
		ctx.fillText(costStr,x,yOffset + this.parentTile.size+2*(fontSize*1.2))
	}
}
