class CreateCanvas {
  constructor(width, height, background, backgroundSpeed) {
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.background = background;
    this.backgroundSpeed = backgroundSpeed;
    this.context;
    this.backgroundPosition = 0;
  }

  createField = () => {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    this.drawRoad();

    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }

  // drawBackground = () => {
  //   this.context.drawImage(this.background, this.backgroundPosition, 0, this.canvas.width, this.canvas.height);
  //   this.context.drawImage(this.background, 0, this.backgroundPosition + this.canvas.height, this.canvas.width, this.canvas.height);
  // }

  // moveBackground = () => {
  //   this.backgroundPosition -= this.backgroundSpeed;

  //   if (this.backgroundPosition === -this.canvas.height) this.backgroundPosition = 0;
  // }

  clear = () => {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawRoad = () => {

    let ctx = this.context;

    ctx.lineWidth = 5;

    ctx.fillStyle="greenyellow";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle="gray";
    ctx.fillRect(50, 0, 400, this.height);

    ctx.strokeStyle = 'white'
    ctx.beginPath();
    // starting position is x=50, y=50
    ctx.moveTo(70, 0);
    // draw the line that has final coordinates x=250, y=50
    ctx.lineTo(70, this.height);
    // .stroke() executes the drawing
    ctx.stroke();
    // close the path
    ctx.closePath();

    ctx.strokeStyle = 'white'
    ctx.beginPath();
    // starting position is x=50, y=50
    ctx.moveTo(430, 0);
    // draw the line that has final coordinates x=250, y=50
    ctx.lineTo(430, this.height);
    // .stroke() executes the drawing
    ctx.stroke();
    // close the path
    ctx.closePath();
    
    
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.setLineDash([30, 30]);
    // starting position is x=50, y=50
    ctx.moveTo(250, 0);
    // draw the line that has final coordinates x=250, y=50
    ctx.lineTo(250, this.height);
    // .stroke() executes the drawing
    ctx.stroke();
    // close the path
    ctx.closePath();
  }
}


class Components {
  constructor(x, y, size, speed, image, gameContext) {
    this.positionX = x;
    this.positionY = y;
    this.size = size;
    this.speed = speed;
    this.image = image;
    this.context = gameContext;
    this.image;
  }

  draw = () => {
    this.context.drawImage(this.image, 250, 350, 50, 100);
    
  }

  clear = () => {
    this.context.drawImage(this.image, 200, 300, 50, 100);
  }

  move = (key) => {
    switch(key) {
      case 39:
        this.positionX += this.speed;
        break;
      case 37:
        this.positionX -= this.speed;
        break;
      default:
        console.log('comando inválido');
    }
  }
}


class Game {
  constructor(field, player){
    this.clearField = player.clear;
    // this.drawBackground = field.drawBackground;
    // this.moveBackground = field.moveBackground;
    this.frames = 0;
    this.drawPlayer = player.draw;
  }

  animationCallback = () => {
    this.clearField();
    // this.drawBackground();
    // this.moveBackground();
    this.drawPlayer();

    this.frames += 1;

    const animation = window.requestAnimationFrame(this.animationCallback)

    if (this.frames > 300) window.cancelAnimationFrame(animation)
  }
  start = () => {
    this.animationCallback();
  }
}



window.onload = function() {
    const field = new CreateCanvas(500, 700, 'greenyellow', 1);
    field.createField()

    const background = new Image();
    background.src = './images/car.png';
    
    background.onload = () => {
      const player = new Components(250, 600, 20, 5, background, field.context);
      player.draw()
      const game = new Game(field,player)
      
      document.getElementById("start-button").onclick = function() {

        game.start()
        window.onkeydown = (e) => {
          player.move(e.keyCode);
        }
      }; 
    } 
}
