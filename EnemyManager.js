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
		let rate = 300;
		if(turns > 10000)
			rate = 200;
		if(turns > 20000)
			rate = 100;
		if(turns > 30000)
			rate = 50;
		if(!(turns%rate)) this.spawnEnemy(turns);
	}
	spawnEnemy(turns){
		let y = this.height - (Math.random()*(turns/400))-Enemy.HEIGHT;
		this.enemies.push(new Enemy(this.width,y));
	}
	render(ctx){
		this.enemies.forEach(enemy=>{
			enemy.render(ctx);
		});
	}
}
