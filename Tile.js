class Tile{
	constructor(x,y,size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.building = null;
		this.type = TileType.NONE;
		this.selected = false;
	}
	getColor(){
		if(this.selected) return 'green';
		//check type to get color
		return Constants.TILE_TYPE_COLOR[this.type];
	}
	select(){
		this.selected = true;
	}
	unselect(){
		this.selected = false;
	}
	render(ctx,xOffset,yOffset){
		if(this.building && this.building instanceof Tube) return;
		ctx.fillStyle = this.getColor();
		ctx.fillRect(xOffset+(this.x*this.size),yOffset+(this.y*this.size),this.size,this.size);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.strokeRect(xOffset+(this.x*this.size),yOffset+(this.y*this.size),this.size,this.size);
	}
}
