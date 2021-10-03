class BottomBar{
	constructor(width,height,selection,canvas,tileMap,wallet){
		this.width = width;
		this.height = height;
		this.selection = selection;
		this.canvas = canvas;
		this.tileMap = tileMap;
		this.wallet = wallet;
		this.dummyBuildings = this.makeDummyBuildings();
		this.buttonManager = null;
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
	buyBuilding(building){
		if(this.wallet.scrap < building.cost) return;
		this.wallet.scrap -= building.cost;
		this.tileMap.addBuilding(this.selection.tile.x,this.selection.tile.y,new building.__proto__.constructor())
		this.selection.updated = true;
	}
	renderRight(ctx,xOffset,yOffset,lives){
		//draw wallet and lives
		ctx.fillStyle='#C89D7C';
		ctx.fillRect(xOffset,yOffset,this.width,this.height);
		const livesText = `Lives: ${lives}`;
		const scrapText = `Scrap: ${this.wallet.scrap}`;
		ctx.fillStyle='white';
		ctx.font ='20px Arial'
		let x,y;
		x = this.width - ctx.measureText(livesText).width - 10;
		y = yOffset + 40;
		ctx.fillText(livesText,x,y);
		
		x = this.width - ctx.measureText(scrapText).width - 10;
		y = yOffset + 70;
		ctx.fillText(scrapText,x,y);


	}
	render(ctx,xOffset,yOffset){
		if(this.buttonManager) this.buttonManager.destroy();
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
				this.buttonManager = new ButtonManager(this.canvas);
				//Display build menu
				this.dummyBuildings.forEach((building,i)=>{
					const buyButton = this.buttonManager.addButton(new BlankButton(30+xOffset+i*100,yOffset+10,50,70));
					buyButton.addClickEvent(()=>this.buyBuilding(building));
					building.render(ctx,30+xOffset + i*100, yOffset+10,true);
				});
			}
		}
	}
}
