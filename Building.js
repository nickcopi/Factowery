class Building{
	constructor(parentTile,name,cost,description,speed){
		this.parentTile = parentTile;
		this.name = name;
		this.cost = cost;
		this.description = description;
		this.speed = speed;
		this.rotation = 0;
		this.ccw = false;
		this.roundRobin = false;
		this.energized = 0;
	}
	setParent(parent){
		this.parentTile = parent;
	}
	getSpeed(turn){
		let speed = this.speed;
		if(this.isEnergized(turn)) speed = Math.floor(speed/2);
		return speed;
	}
	isEnergized(turn){
		return this.energized > turn;
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
			if(this.roundRobin) this.ccw = !this.ccw;
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
	renderEnergized(ctx,xOffset,yOffset,turn){
		if(this.isEnergized(turn)){
			ctx.strokeStyle='#ffd700';
			const shockXMin = xOffset + this.parentTile.x*this.parentTile.size;
			const shockXMax = this.parentTile.size
			const shockYMin = yOffset + this.parentTile.y*this.parentTile.size;
			const shockYMax = this.parentTile.size
			ctx.beginPath();
			ctx.moveTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.lineTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.lineTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.lineTo(shockXMin+Math.floor(Math.random()*shockXMax), shockYMin+Math.floor(Math.random()*shockYMax));
			ctx.stroke();
		}
		
	}
	render(ctx,xOffset,yOffset,fromMenu,turn){
		if(fromMenu) this.drawName(ctx,xOffset,yOffset);
		this.renderSpecific(ctx,xOffset,yOffset,fromMenu);
		this.renderEnergized(ctx,xOffset,yOffset,turn);

	}
}
