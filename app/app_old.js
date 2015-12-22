var c = document.getElementById('cvs'),
    graph = c.getContext('2d'),
    playerType,
    screenWidth = 600,
    screenHeight = 600,
    gridSize = 80,
    boardSize = 100,
    avatar = new Image(),
    avatar_animation = -1,
    frameIndex = 0,
    offset = {
      x: 0,
      y: 0
    },
    move_to = {
      x: 0,
      y: 0
    },
    avatar_pos = {
      x: 0,
      y: 0
    },
    tickCount = 0,
    gameSpeed = 5,
    ticksPerFrame = 5;


document.addEventListener( 'click', moveAvatarTo, false );

// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function ( callback ) {
            window.setTimeout( callback, 1000 / 60 );
          };
})();

window.onload = function() {
  console.log('loading');
  screenHeight = document.body.offsetHeight;
  screenWidth = document.body.offsetWidth;
  avatar_pos.x = screenWidth / 2;
  avatar_pos.y = screenHeight / 2;

  c.width = screenWidth;
  c.height = screenHeight;

  avatar.src = './sprites/avatar_a.png';
  avatar.onload = spriteReady();
};

function spriteReady() {
  console.log('ready');
  startGame( 'player' );
}

function startGame( type ) {
  playerName = 'Pippo';
  playerType = type;

  animloop();
}

function animloop() {
  requestAnimFrame( animloop );
  gameLoop();
}

function gameLoop() {
  offset.y = offset.y >= 0 ? offset.y : gridSize - 1;
  offset.y = offset.y < gridSize ? offset.y : 0;

  offset.x = offset.x >= 0 ? offset.x : gridSize - 1;
  offset.x = offset.x < gridSize ? offset.x : 0;

  graph.fillStyle = '#eee';
  graph.fillRect( 0, 0, screenWidth, screenHeight );

  drawgrid();
  animateSprite();
}

function drawgrid() {
  graph.lineWidth = '1px';
  graph.strokeStyle = '#333';
  graph.globalAlpha = 0.25;
  graph.beginPath();

  for ( var x = offset.y; x < screenWidth; x += gridSize ) {
    graph.moveTo( x, 0 );
    graph.lineTo( x, screenHeight );
  }
  for ( var y = offset.x; y < screenHeight; y += gridSize ) {
    graph.moveTo( 0, y );
    graph.lineTo( screenWidth, y );
  }

  graph.stroke();
  graph.globalAlpha = 1;
}

function animateSprite() {
  var sW = 150,  // sprite clip dimension
      sH = 120;

    console.log(avatar_pos);
  if ( avatar_pos.x > move_to.x ) {
    offset.x += gameSpeed;
    avatar_animation = 1;
  }

  if ( avatar_animation < 0 ) {
    graph.drawImage(
      avatar,
      0, 0, sW, sH, // clip size
      avatar_pos.x, avatar_pos.y, // where on canvas
      sW, sH // image size to draw
    );

    return;
  }

  tickCount += 1;

  if ( tickCount > ticksPerFrame ) {
    tickCount = 0;

    // Go to the next frame
    frameIndex = frameIndex < 4 ? frameIndex += 1 : 0;
  }

  graph.drawImage(
    avatar,
    frameIndex * sW, sH * avatar_animation, sW, sH, // clip size
    50, 50, // where on canvas
    sW, sH // image size to draw
  );

  // frame = 1;
}

function moveAvatarTo( event ) {
  move_to = {
    x: event.x,
    y: event.y
  }
}

function keyReleased() {
  avatar_animation = -1;
}

function keyPressed( event ) {
  if ( event.which === 40 ) {
    //down
    offset.x += gameSpeed;
    avatar_animation = 1;
  }
  else if ( event.which === 38 ) {
    // key up
    offset.x -= gameSpeed;
    avatar_animation = 0;
  }
  else if ( event.which === 37 ) {
    // key left
    offset.y -= gameSpeed;
    avatar_animation = 3;
  }
  else if ( event.which === 39 ) {
    // key right
    offset.y += gameSpeed;
    avatar_animation = 2;
  }
}
