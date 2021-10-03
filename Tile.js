class Tile{
	constructor(x,y,size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.building = null;
		this.type = 0;
		this.selected = false;
	}
	getColor(){
		if(this.selected) return 'blue';
		//check type to get color
		return 'white';
	}
	select(){
		this.selected = true;
	}
	unselect(){
		this.selected = false;
	}
	render(ctx,xOffset,yOffset){
		ctx.fillStyle = this.getColor();
		ctx.fillRect(xOffset+(this.x*this.size),yOffset+(this.y*this.size),this.size,this.size);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.strokeRect(xOffset+(this.x*this.size),yOffset+(this.y*this.size),this.size,this.size);
		if(this.building)
			this.building.render(ctx,xOffset,yOffser);
	}
}
