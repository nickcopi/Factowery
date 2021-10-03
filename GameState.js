class GameState{
	constructor(width,height){
		this.tiles = new TileMap(Constants.GRID_SIZE,Constants.TILE_SIZE);
		this.turn = 0;
		this.lives = { 
			lives:10
		}
		this.enemyManager = new EnemyManager(width,height,this.lives);
		this.wallet = {
			scrap:30
		}
	}
}
