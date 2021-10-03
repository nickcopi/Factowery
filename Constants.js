const Constants = {
	TILE_SIZE:20,
	GRID_SIZE:600,
	TILE_TYPE_COLOR:[],
	TILE_TYPE_NAME:[]
}
Constants.TILE_TYPE_COLOR[TileType.NONE] = 'white';
Constants.TILE_TYPE_COLOR[TileType.FUEL] = 'gray';
Constants.TILE_TYPE_COLOR[TileType.WEAPON] = 'red';
Constants.TILE_TYPE_COLOR[TileType.ENERGY] = '#99ccff';
Constants.TILE_TYPE_COLOR[TileType.SCRAP] = '#964B00';

Constants.TILE_TYPE_NAME[TileType.NONE] = 'None';
Constants.TILE_TYPE_NAME[TileType.FUEL] = 'Fuel Source';
Constants.TILE_TYPE_NAME[TileType.WEAPON] = 'Weapon Source';
Constants.TILE_TYPE_NAME[TileType.ENERGY] = 'Energy Source';
Constants.TILE_TYPE_NAME[TileType.SCRAP] = 'Junk Scrap Source';
