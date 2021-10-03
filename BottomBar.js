class BottomBar{
	constructor(width,height,selection){
		this.width = width;
		this.height = height;
		this.selection = selection;
		this.dummyBuildings = this.makeDummyBuildings();
	}
	makeDummyBuildings(){
		const dummyTile = new Tile(0,0,35);
		return [
			new Drill(dummyTile),
			new Tube(dummyTile),
			new Gun(dummyTile),
			new Energizer(dummyTile)
		]
	}
	render(ctx,xOffset,yOffset){
		ctx.fillStyle='#C89D7C';
		ctx.fillRect(xOffset,yOffset,this.width,this.height);
		ctx.fillStyle='white';
		if(this.selection.tile){
			let building = this.selection.tile.building;
			if(building){
				let x,y;
				let info = '';
				x = xOffset+30;
				y = yOffset+50;
				ctx.font ='40px Arial'
				ctx.fillText(building.name,x,y);

				x = xOffset+30;
				y = yOffset+80;
				ctx.font ='20px Arial'
				ctx.fillText(building.description,x,y);


				x = xOffset+220;
				y = yOffset+50;
				if(building instanceof Energizer) info = `Energy: ${building.energy}`;
				if(building instanceof Tube) info = `Items: ${building.items.length}`;
				if(building instanceof Drill) info = `Fuel: ${building.fuel}`;
				if(building instanceof Gun) info = `Ammo: ${building.ammo}`;
				ctx.fillText(info,x,y);
			} else {
				//Display build menu
				this.dummyBuildings.forEach((building,i)=>{
					building.render(ctx,30+xOffset + i*100, yOffset+10,true);
				});

			}
		}
	}
}
