class Scene{
	static WIDTH = 1280;
	static HEIGHT = 700;
	constructor(canvas){
		this.width = Scene.WIDTH;
		this.height = Scene.HEIGHT;
		this.initCanvas(canvas);
		this.state = new GameState(this.width,this.height-100);
		this.selection = {updated:true};
		this.bottomBar = new BottomBar(this.width,100,this.selection,canvas,this.state.tiles,this.state.wallet);
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		},1000/60);
		this.addClickListener();
	}
	initCanvas(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		canvas.width = Scene.WIDTH;
		canvas.height = Scene.HEIGHT;
	}
	addClickListener(){
		this.clickListener = this.handleClick.bind(this);
		this.canvas.addEventListener('click',this.clickListener);
	}
	handleClick(e){
		const x = e.offsetX;
		const y = e.offsetY;
		if(x < 0 || x >= Constants.GRID_SIZE) return;
		if(y < 0 || y >= Constants.GRID_SIZE) return;
		this.state.tiles.select(Math.floor(x/Constants.TILE_SIZE),Math.floor(y/Constants.TILE_SIZE),this.selection);
	}
	update(){
		this.state.turn++;
		this.state.tiles.buildings = this.state.tiles.buildings.filter(building=>{
			if(building.scrapped) return false;
			building.use(this.state.turn,this.state.tiles,this.state.wallet,this.state.bulletManager);
			return true;
		});
		this.state.enemyManager.update(this.state.turn);
		this.state.bulletManager.update(this.state.turn);
		this.state.bulletManager.doCollide(this.state.enemyManager);
	}
	render(){
		const {canvas, ctx, state} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height-100);
		ctx.fillStyle='green';
		ctx.fillRect(Constants.GRID_SIZE,0,canvas.width-Constants.GRID_SIZE,canvas.height-100);
		ctx.fillStyle='white';
		ctx.fillRect(0,0,Constants.GRID_SIZE,Constants.GRID_SIZE);
		state.tiles.render(ctx);
		state.enemyManager.render(ctx);
		state.bulletManager.render(ctx);
		if(this.selection.tile){
			let x = this.selection.tile.x*this.selection.tile.size;
			let y = this.selection.tile.y*this.selection.tile.size;
			ctx.fillStyle='blue';
			ctx.globalAlpha = 0.3;
			ctx.fillRect(x,y,this.selection.tile.size,this.selection.tile.size);
			ctx.globalAlpha = 1;
		}
		if(this.selection.updated){
			this.bottomBar.render(ctx,0,canvas.height-100);
			this.selection.updated = false;
		}
		this.bottomBar.renderRight(ctx,canvas.width-200,canvas.height-100,state.lives.lives);
	}
}
