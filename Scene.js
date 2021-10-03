class Scene{
	static WIDTH = 1280;
	static HEIGHT = 700;
	constructor(canvas){
		this.initCanvas(canvas);
		this.state = new GameState();
		this.selection = {updated:true};
		this.bottomBar = new BottomBar(1280,100,this.selection,canvas,this.state.tiles,this.state.wallet);
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
		this.state.tiles.buildings.forEach(building=>{
			building.use(this.state.turn,this.state.tiles);
		});
	}
	render(){
		const {canvas, ctx, state} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height-100);
		state.tiles.render(ctx);
		ctx.fillStyle='green';
		ctx.fillRect(Constants.GRID_SIZE,0,canvas.width-Constants.GRID_SIZE,canvas.height-100);
		if(this.selection.updated){
			this.bottomBar.render(ctx,0,canvas.height-100);
			this.selection.updated = false;
		}
		this.bottomBar.renderRight(ctx,canvas.width-200,canvas.height-100,state.lives);
	}
}
