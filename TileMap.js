class TileMap{
	constructor(gridSize,tileSize){
		this.gridSize = gridSize;
		this.tileSize = tileSize;
		this.numTiles = Math.floor(gridSize/tileSize);
		this.buildings = [];
		this.grid = this.initGrid(gridSize,tileSize);
		this.initTerrain();
	}
	initGrid(gridSize,tileSize){
		const numTiles = this.numTiles;
		let grid = (new Array(numTiles)).fill([]);
		grid = grid.map((row,j)=>{
			row = [];
			for(let i = 0; i < numTiles; i++){
				row.push(new Tile(i,j,tileSize));
			}
			return row;
		});
		return grid;
	}
	initTerrain(){
		const numTiles = this.numTiles;
		this.terrainRegion(TileType.FUEL,0,0,numTiles/4,5);
		this.terrainRegion(TileType.WEAPON,numTiles/2,0,numTiles/4,5);
		this.terrainRegion(TileType.ENERGY,0,numTiles/2,numTiles/4,5);
		this.addBuilding(24,25, new Energizer(null));
		this.getGrid(25,25).type = TileType.WEAPON;
		this.addBuilding(25,25, new Drill(null));
		this.addBuilding(26,25, new Tube(null));
		this.addBuilding(27,25, new Tube(null));
		this.addBuilding(27,24, new Tube(null));

		this.addBuilding(27,23, new Tube(null));
		this.addBuilding(26,23, new Tube(null));
		this.addBuilding(25,23, new Tube(null));
		this.addBuilding(25,23, new Tube(null));
		this.addBuilding(25,22, new Gun(null));
		//this.addBuilding(28,25, new Gun(null));
	};
	terrainRegion(type,x,y,maxSize,count){
		for(let i = 0; i < count; i++){
			const width = Math.floor((Math.random() * maxSize));
			const height = Math.floor((Math.random() * maxSize));
			const xOffset = Math.floor((Math.random() * maxSize));
			const yOffset = Math.floor((Math.random() * maxSize));

			for(let gy  = y+yOffset; gy < y+yOffset+height; gy++){
				for(let gx = x+xOffset; gx < x+xOffset+width; gx++){
					let tile = this.getGrid(gx,gy);
					if(tile) tile.type = type;
				}
			}

		}
		
	}
	getGrid(x,y){
		x = Math.floor(x);
		y = Math.floor(y);
		if(x < 0 || y < 0 || x > this.numTiles || y > this.numTiles) return null;
		return this.grid[y][x];
	}
	addBuilding(x,y,building){
		const tile = this.getGrid(x,y);
		if(!tile) return false;
		tile.building = building;
		building.setParent(tile);
		this.buildings.push(building);
	}
	render(ctx){
		this.grid.forEach(row=>{
			row.forEach(tile=>{
				tile.render(ctx,0,0);
			});
		});
		this.buildings.forEach(building=>{
			building.render(ctx,0,0);
		});
	}
	select(x,y,selection){
		this.grid.forEach(row=>{
			row.forEach(tile=>{
				tile.unselect();
			});
		});
		this.grid[y][x].select();
		selection.tile = this.grid[y][x];
		selection.updated = true;
	}
}
