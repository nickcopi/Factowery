class TileMap{
	constructor(gridSize,tileSize){
		this.gridSize = gridSize;
		this.tileSize = tileSize;
		this.numTiles = Math.floor(gridSize/tileSize);
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
					console.log(tile);
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
	render(ctx){
		this.grid.forEach(row=>{
			row.forEach(tile=>{
				tile.render(ctx,0,0);
			});
		});
	}
	select(x,y){
		this.grid.forEach(row=>{
			row.forEach(tile=>{
				tile.unselect();
			});
		});
		this.grid[y][x].select();
	}
}
