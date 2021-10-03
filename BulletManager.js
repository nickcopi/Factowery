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
	addBullet(bullet){
		this.bullets.push(bullet);
	}
	render(ctx){
		this.bullets.forEach(bullet=>{
			bullet.render(ctx);
		});
	}

}
