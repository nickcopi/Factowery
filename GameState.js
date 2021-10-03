class GameState{
	constructor(){
		this.tiles = new TileMap(Constants.GRID_SIZE,Constants.TILE_SIZE);
		this.turn = 0;
	}
}
