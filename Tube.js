class Tube extends Building{
	static NAME = 'Tube';
	static COST = 1;
	static DESCRIPTION = 'Tubes allow the movement of items through them in all directions.'
	static SPEED = 3;
	constructor(parentTile){
		super(parentTile,Tube.NAME,Tube.COST,Tube.DESCRIPTION,Tube.SPEED);
		this.items = [];
	}
	use(turn){
		if(turn%SPEED !== 0) return;
		//drill
	}
	render(ctx,xOffset,yOffset){
		//draw items inside tube
	}

}
