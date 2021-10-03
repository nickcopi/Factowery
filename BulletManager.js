class BulletManager{
	constructor(width,height){
		this.width = width;
		this.height = height;
		this.bullets = [];
	}
	update(){
		this.bullets = this.bullets.filter(bullet=>{
			if(bullet.x > this.width) return false;
			bullet.move();
			return true;
		});
	}
	collide(o1,o2){
		return (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y) && o1 !== o2;
	}
	doCollide(enemyManager){
		this.bullets = this.bullets.filter(bullet=>{
			let usedUp = false;
			enemyManager.enemies = enemyManager.enemies.filter(enemy=>{
				if(usedUp) return true;
				if(this.collide(bullet,enemy)){
					usedUp = true;
					return false;
				}
				return true;
			});
			return !usedUp;
		});
	}
	addBullet(bullet){
		this.bullets.push(bullet);
	}
	render(ctx){
		this.bullets.forEach(bullet=>{
			bullet.render(ctx);
		});
	}

}
