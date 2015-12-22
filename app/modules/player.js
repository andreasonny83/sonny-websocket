var $_PLAYER = (function( graph, player ) {

  function draw( avatar, shadow ) {
    graph.globalAlpha = shadow ? 0.15 : 1;

    graph.drawImage(
      avatar,
      player.avatar.frameIndex * player.avatar.sprite_size.w, player.avatar.sprite_size.h * player.avatar.animation, player.avatar.sprite_size.w, player.avatar.sprite_size.h, // clip size
      player.pos.x, player.pos.y, // where on canvas
      player.avatar.sprite_size.w, player.avatar.sprite_size.h // image size to draw
    );

    graph.globalAlpha = 1;
  }

  function animateSprite() {
    if ( player.pos.x - player.speed > player.targetPos.x ) {
      //move left
      player.avatar.animation = 2;
      nextFrame();
      player.pos.x -= player.speed;
    }
    else if ( player.pos.x + player.speed < player.targetPos.x ) {
      //move right
      player.avatar.animation = 3;
      nextFrame();
      player.pos.x += player.speed;
    }
    else if ( player.pos.y + player.speed < player.targetPos.y ) {
      //move down
      player.avatar.animation = 0;
      nextFrame();
      player.pos.y += player.speed;
    }
    else if ( player.pos.y - player.speed > player.targetPos.y ) {
      //move up
      player.avatar.animation = 1;
      nextFrame();
      player.pos.y -= player.speed;
    }
    else {
      player.pos.x = player.targetPos.x;
      player.pos.y = player.targetPos.y;
      player.avatar.animation = 0;
      player.avatar.frameIndex = 0;
    }
  }

  function nextFrame() {
    if ( player.avatar.frameSpeedIndex < player.avatar.frameSpeed ) {
      player.avatar.frameSpeedIndex += 1;
    }
    else {
      player.avatar.frameSpeedIndex = 0;
      player.avatar.frameIndex = player.avatar.frameIndex < player.avatar.frames ? player.avatar.frameIndex + 1 : 0;
    }
  }

  return {
    draw: draw,
    animateSprite: animateSprite
  };
}( _graph, _player ));
