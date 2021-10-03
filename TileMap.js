class TileMap{
	constructor(gridSize,tileSize){
		this.gridSize = gridSize;
		this.tileSize = tileSize;
		this.grid = this.initGrid(gridSize,tileSize);
	}
	initGrid(gridSize,tileSize){
		const numTiles = Math.floor(gridSize/tileSize);
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
