const game = Runner.instance_;

// Jump and duck simulation

function jump() {
  let e = new Event("keydown");
  e.keyCode = 38;
  document.dispatchEvent(e);
  // Taking care of keyup event
  setTimeout(function() {
    e = new Event("keyup");
    e.keyCode = 38;
    document.dispatchEvent(e);
  }, 300);
}

function duck() {
  let e = new Event("keydown");
  e.keyCode = 40;
  document.dispatchEvent(e);
  // Taking care of keyup event
  setTimeout(function() {
    e = new Event("keyup");
    e.keyCode = 40;
    document.dispatchEvent(e);
  }, 300);
}

(function tick() {
  /* do not do anything if the game is not running */
  if (game.crashed || game.paused) {
    return requestAnimationFrame(tick);
  }

  let obstacles = game.horizon.obstacles;
  let tRex = game.tRex;

  // If there is an obstacle in the way (array is not empty), we do some actions
  if (obstacles.length) {
    const obstacle = obstacles[0];
    // If the distance between the obstacle and our dear T-Rex is less than 60 pixels, we jump!
    if (obstacle.xPos - tRex.xPos < 60) {
      // If the obstacle is higher than 75 pixels, our dino has to jump
      if (obstacle.yPos > 75) {
        if (!tRex.jumping) {
          jump();
        }
      // Flying dino! Our T-Rex has to duck
      } else if (obstacle.yPos === 75) {
        if (!tRex.ducking) {
          duck();
        }
      }
    }
  }

  requestAnimationFrame(tick);
})();
