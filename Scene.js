class Scene{
	static WIDTH = 1280;
	static HEIGHT = 600;
	constructor(canvas){
		this.initCanvas(canvas);
		this.state = new GameState();
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		},1000/60);
		this.addClickListener();
		this.selectedTile = null;
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
		if(x < 0 || x > Constants.GRID_SIZE) return;
		if(y < 0 || y > Constants.GRID_SIZE) return;
		this.state.tiles.select(Math.floor(x/Constants.TILE_SIZE),Math.floor(y/Constants.TILE_SIZE));
	}
	update(){

	}
	render(){
		const {canvas, ctx, state} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		state.tiles.render(ctx);
	}
}
