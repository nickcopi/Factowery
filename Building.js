class Building{
	constructor(parentTile,name,cost,description,speed){
		this.parentTile = parentTile;
		this.name = name;
		this.cost = cost;
		this.description = description;
		this.speed = speed;
		this.rotation = 0;
	}
	setParent(parent){
		this.parentTile = parent;
	}
}
