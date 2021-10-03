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
}
