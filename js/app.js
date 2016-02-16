var Xdir = 101;
var Ydir = 84;
var Canvasleft = 0;
var Canvasright = 400;
var Canvastop = 84;
var Canvasbottom = 400;
var vel;//intercambiar velocidades

// Enemies our player must avoid
var Enemy = function(x,y,p) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
    this.y = y;
	this.p = p;//para evitar colision debo saber el cual cosito es
    var enemySpeeds = [120, 140, 160, 180, 200, 220, 240, 260];
    var randomSpeed = enemySpeeds[Math.floor(Math.random() * enemySpeeds.length)];
    this.speed = randomSpeed;  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	//para que despues que se salga el insecto no desaparesca cuando toque el borde.
    if (this.x > (Canvasright + 101)) {
        this.x = Math.floor(Math.random() * -300);
    }
	//evitar colision entre insectos entre el de atras y el de aa
	for (var j = 1; j < 6;j = j+2){
		if(this.p == j && (this.x > allEnemies[j-1].x - 100 || this.x > allEnemies[j-1].x - 50)){
		vel = this.speed;
		this.speed = allEnemies[j-1].speed;
		allEnemies[j-1].speed = vel; 
		}
	}
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var score = 0;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
	this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
	
};
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	for(var e = 0, quantityEnemies = allEnemies.length; e < quantityEnemies; e++) {
        if(player.x <= (allEnemies[e].x + 70) && allEnemies[e].x <= (player.x + 50) && player.y <= (allEnemies[e].y + 70) && allEnemies[e].y <= (player.y + 60)) {
            score = 0;
            player.reset();        
	
            }
}
};
Player.prototype.handleInput = function(key) {
	 switch(key){
    case 'left':
        if (this.x > Canvasleft)
        this.x -=Xdir;
        break;
    case 'right':
        if (this.x < Canvasright)
        this.x +=Xdir;
        break;
    case 'up':
        if (this.y > Canvastop)
        this.y -=Ydir;
        else {player.reset();
		score++;
		document.getElementById('score').innerHTML = 'Score ['+score+']';}
        break;
    case 'down':
        if (this.y < Canvasbottom)
        this.y +=Ydir;
        break;
    default:
        return;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
	
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
//linea de arriba
var enemy1 = new Enemy(0, 62, 0);
allEnemies.push(enemy1);
var enemy2 = new Enemy(-200, 62, 1);
allEnemies.push(enemy2);
//mitad
var enemy3 = new Enemy(0, 144, 2);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-200, 144, 3);
allEnemies.push(enemy4);
//ultima
var enemy5 = new Enemy(0, 230, 4);
allEnemies.push(enemy5);
var enemy6 = new Enemy(-200, 230, 5);
allEnemies.push(enemy6);
player = new Player(200, 400, 7);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};
