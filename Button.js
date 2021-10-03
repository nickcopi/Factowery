let Button;
let ButtonRender;
let BasicButtonRender;
let ButtonManager;
let ImageButton;
let BlankButton;
(()=>{

	ButtonManager = class{
		constructor(canvas){
			this.buttons = [];
			this.lastMouse = {x:0,y:0};
			this.onClickFunc = this.onClick.bind(this);
			this.onMouseMoveFunc = this.onMouseMove.bind(this);
			canvas.addEventListener('click', this.onClickFunc);
			canvas.addEventListener('mousemove', this.onMouseMoveFunc);
		}
		onMouseMove(e){
			const [x,y] = [e.offsetX, e.offsetY];
			let anyButton = false;
			this.buttons.forEach(button=>{
				let collidesNow = this.collide({x,y,width:1,height:1},button);
				let collidesBefore = this.collide({
					x:this.lastMouse.x,
					y:this.lastMouse.y,
					width:1,
					height:1
				},button);
				if(collidesNow && !collidesBefore)
					button.mouseOver();
				if(collidesBefore && !collidesNow)
					button.mouseOut();
				anyButton = anyButton || collidesNow;
			});
			if(anyButton) canvas.style.cursor = 'pointer';
			else canvas.style.cursor = 'default';
			this.lastMouse = {x,y};
		}
		onClick(e){
			this.buttons.forEach(button=>{
				if(this.collide(button, {
					x: e.offsetX,
					y: e.offsetY,
					width:1,
					height:1
				}))
					button.click();
			});
		}
		addButton(button){
			this.buttons.push(button);
			return button;
		}
		collide(o1,o2){
			return (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y) && o1 !== o2;
		}
		render(ctx){
			this.buttons.forEach(button=>button.render(ctx));
		}
		destroy(){
			canvas.removeEventListener('click', this.onClickFunc);
			canvas.removeEventListener('mousemove', this.onMouseMoveFunc);
		}
	}


	ButtonRenderer = class {
		constructor(){

		}
		render(button,ctx){

		}
	}

	BasicButtonRenderer = class extends ButtonRenderer{
		constructor(){
			super();
			this.font = 'Arial';
			this.fontSize = 16;
			this.backgroundColor = 'black';
			this.textColor = 'white';
		}
		render(button,ctx){
			ctx.fillStyle = this.backgroundColor;
			ctx.fillRect(button.x, button.y, button.width, button.height);
			ctx.fillStyle = this.textColor;
			ctx.font = `${this.fontSize}px ${this.font}`;
			const x = button.x + button.width/2 - ctx.measureText(button.text).width/2;
			const y = button.y + button.height/2 + this.fontSize/4;
			ctx.fillText(button.text,x,y);
		}
	}
	class ImageButtonRenderer extends ButtonRenderer{
		constructor(image){
			super();
			this.image = image;
		}
		render(button,ctx){
			console.log(this.image,button.x,button.y,button.width,button.height);
			ctx.drawImage(this.image,button.x,button.y,button.width,button.height);
		}
	}

	Button = class {
		constructor(x, y, width, height, text, renderer){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.text = text;
			this.renderer = renderer;
			if(!renderer)
				this.renderer = new BasicButtonRenderer();
			this.clickEvents = [];
			this.mouseOutEvents = [];
			this.mouseOverEvents = [];
		}
		addClickEvent(e){
			this.clickEvents.push(e);
		}
		removeClickEvent(e){
			this.clickEvents.filter(ev=> ev !== e);
		}
		addMouseOutEvent(e){
			this.mouseOutEvents.push(e);
		}
		addMouseOverEvent(e){
			this.mouseOverEvents.push(e);
		}
		render(ctx){
			this.renderer.render(this,ctx);
		}
		click(){
			this.clickEvents.forEach(e=>e());
		}
		mouseOut(){
			this.mouseOutEvents.forEach(e=>e());
		}
		mouseOver(){
			this.mouseOverEvents.forEach(e=>e());
		}

	}

	/*
	 * Special case of button that renders an image and takes no text
	 *
	 * */
	ImageButton = class extends Button{
		constructor(x, y, width, height, image){
			super(x,y,width,height,'',new ImageButtonRenderer(image));
		}
	}

	/*
	 * Special case of button that renders nothing
	 *
	 * */
	BlankButton = class extends Button{
		constructor(x, y, width, height){
			super(x,y,width,height,'',new ButtonRenderer());
		}
	}
})()

