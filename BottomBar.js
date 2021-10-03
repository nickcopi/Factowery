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
		this.keyPress = this.handleKey.bind(this);
		window.addEventListener('keypress',this.keyPress);
	}
	destroy(){
		window.removeEventListener('keypress',this.keyPress);
	}
	makeDummyBuildings(){
		const dummyTile = new Tile(0,0,35);
		return [
			new Drill(dummyTile),
			new Tube(dummyTile),
			new Gun(dummyTile),
			new Energizer(dummyTile),
			new Scrapper(dummyTile),
		]
	}
	handleKey(e){
		if(!this.selection.tile) return;
		switch(e.key){
			case 'w':
				this.changeSelection(0,-1);
				break;
			case 'd':
				this.changeSelection(1,0);
				break;
			case 's':
				this.changeSelection(0,1);
				break;
			case 'a':
				this.changeSelection(-1,0);
				break;
		}
		if(!this.selection.tile.building){
			switch(e.key){
				case '1':
					this.buyBuilding(this.dummyBuildings[0]);
					break;
				case '2':
					this.buyBuilding(this.dummyBuildings[1]);
					break;
				case '3':
					this.buyBuilding(this.dummyBuildings[2]);
					break;
				case '4':
					this.buyBuilding(this.dummyBuildings[3]);
					break;
				case '5':
					this.buyBuilding(this.dummyBuildings[4]);
					break;
			}
		} else {
			switch(e.key){
				case 'q':
					this.sellBuilding(this.selection.tile.building);
					break;
				case 'r':
					break;
				case 'c':
					this.toggleCCW(this.selection.tile.building);
					break;
			}

		}
	}
	changeSelection(x,y){
		const tile = this.tileMap.getGrid(this.selection.tile.x+x,this.selection.tile.y+y);
		if(!tile) return;
		this.selection.tile = tile;
		this.selection.updated = true;
	}
	buyBuilding(building){
		if(this.wallet.scrap < building.cost) return;
		this.wallet.scrap -= building.cost;
		this.tileMap.addBuilding(this.selection.tile.x,this.selection.tile.y,new building.__proto__.constructor())
		this.selection.updated = true;
	}
	sellBuilding(){
		const building = this.selection.tile.building;
		if(!building) return;
		//gets cleaned up from state.buildings cache in the main update loop
		this.selection.tile.building = null;
		building.scrapped = true;
		this.wallet.scrap += building.cost;
		this.selection.updated = true;
	}
	toggleCCW(building){
		building.ccw = !building.ccw;
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
		y = yOffset + 25;
		ctx.fillText(livesText,x,y);
		
		x = this.width - ctx.measureText(scrapText).width - 10;
		y = yOffset + 50;
		ctx.fillText(scrapText,x,y);

		x = this.width - ctx.measureText(scrapText).width - 10;
		y = yOffset + 50;
		ctx.fillText(scrapText,x,y);
		if(this.selection.tile){
			const mineableMaterial = `Material: ${Constants.TILE_TYPE_NAME[this.selection.tile.type]}`
			x = this.width - ctx.measureText(mineableMaterial).width - 10;
			y = yOffset + 75;
			ctx.fillText(mineableMaterial,x,y);
		}


	}
	render(ctx,xOffset,yOffset){
		if(this.buttonManager) this.buttonManager.destroy();
		ctx.fillStyle='#C89D7C';
		ctx.fillRect(xOffset,yOffset,this.width,this.height);
		ctx.fillStyle='white';


		if(this.selection.tile){
			let building = this.selection.tile.building;
			if(building){
				this.buttonManager = new ButtonManager(this.canvas);
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
				if(building instanceof Scrapper) info = `Scrap: ${building.scrap} Fuel: ${building.fuel}`;
				ctx.fillText(info,x,y);
				let sellButtonX = xOffset+340;
				if(building instanceof Scrapper) sellButtonX = xOffset+400;
				const sellButton = this.buttonManager.addButton(new Button(sellButtonX,yOffset+25,100,25,'Scrap'));
				sellButton.addClickEvent(()=>this.sellBuilding());
				const ccwButton = this.buttonManager.addButton(new Button(ctx.measureText(building.description).width+45,yOffset+60,150,25,(building.ccw?'Counter Clockwise':'Clockwise')));
				ccwButton.addClickEvent(()=>this.toggleCCW(building));
				this.buttonManager.render(ctx);
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
