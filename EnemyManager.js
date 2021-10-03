class EnemyManager{
	constructor(width,height,lives){
		this.width = width;
		this.height = height;
		this.lives = lives;
		this.enemies = [new Enemy(this.width,this.height-Enemy.HEIGHT)];
	}
	update(turns){
		this.enemies = this.enemies.filter(enemy=>{
			enemy.move();
			if(enemy.x < Constants.GRID_SIZE){
				this.lives.lives--;
				return false;
			}
			return true;

		});
	}
	render(ctx){
		this.enemies.forEach(enemy=>{
			enemy.render(ctx);
		});
	}
}
