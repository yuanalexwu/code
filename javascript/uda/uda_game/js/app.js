// Enemies our player must avoid
var Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png'
  this.x = Number.isInteger(x) ? x : 0
  this.y = Number.isInteger(y) ? y : 0
  this.secondCounter = 0
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // manipulate the position
  this.secondCounter += dt
  if (this.secondCounter >= 1) {
    // move the bug's position
    if (this.x > xEnd) {
      this.x = xStart
    } else {
      this.x += xStep
    }
    // reset this counter
    this.secondCounter = 0

    // check weather game is over
    if (checkIsGameOver()) {
      player.x = playerInit.x
      player.y = playerInit.y
    }
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.x = Number.isInteger(x) ? x : 0
  this.y = Number.isInteger(y) ? y : 0
  this.sprite = 'images/char-boy.png'
}
Player.prototype.update = function (dt) {
  // we do nothing here, cause we trigger
  // the motivation of player in the event listener below
}
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

var xStep = 101 // each motivation for x
var yStep = 80 // each motivation for y
var xStart = 0 // avaiable start axis for x
var xEnd = xStart + 4 * xStep // avaiable end axis for x
var yStart = 50 // avaiable start axis for y
var yEnd = yStart + 4 * yStep // avaiable end axis for y
Player.prototype.handleInput = function (direction) {
  switch (direction) {
    case 'left': {
      if (this.x > xStart) {
        this.x -= xStep
      }
      break
    }
    case 'right': {
      if (this.x < xEnd) {
        this.x += xStep
      }
      break
    }
    case 'up': {
      if (this.y > yStart) {
        this.y -= yStep
      }
      break
    }
    case 'down': {
      if (this.y < yEnd) {
        this.y += yStep
      }
      break
    }
  }
  // calculate the position of all the bugs and player
  // if they in the same axis then game over
  if (checkIsGameOver()) {
    player.x = playerInit.x
    player.y = playerInit.y
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  // line 1
  new Enemy(0, yStart),
// line 2
  new Enemy(xStart + xStep * 2, yStart + yStep * 1),
// line 3
  new Enemy(xStart + xStep * 3, yStart + yStep * 2),
]
var playerInit = {
  x: 0,
  y: yStart + yStep * 4
}
var player = new Player(playerInit.x, playerInit.y)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  player.handleInput(allowedKeys[e.keyCode])
})

/**
 * check game is over
 */
function checkIsGameOver () {
  var x = player.x
  var y = player.y
  for (let enemy of allEnemies) {
    var eX = enemy.x
    var eY = enemy.y
    if (x == eX && y == eY) {
      return true
    }
  }
}
