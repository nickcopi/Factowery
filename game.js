class Game{
	constructor(canvas){
		this.scene = new Scene(canvas);
	}

}


let game;
window.addEventListener('load',()=>{
	game = new Game(document.getElementById('canvas'));
});
