var $_PLAYER = (function( graph, player ) {

  function draw( avatar, shadow ) {
    graph.globalAlpha = shadow ? 0.15 : 1;

    graph.drawImage(
      avatar,
      0, player.avatar_size.h * player.avatar_animation, player.avatar_size.w, player.avatar_size.h, // clip size
      player.pos.x, player.pos.y, // where on canvas
      player.avatar_size.w, player.avatar_size.h // image size to draw
    );

    graph.globalAlpha = 1;
  }

  function animateSprite() {
    if ( player.pos.x - player.speed > player.targetPos.x ) {
      //move left
      player.avatar_animation = 2;
      player.pos.x -= player.speed;
    }
    else if ( player.pos.x + player.speed < player.targetPos.x ) {
      //move right
      player.avatar_animation = 3;
      player.pos.x += player.speed;
    }
    else if ( player.pos.y + player.speed < player.targetPos.y ) {
      //move down
      player.avatar_animation = 0;
      player.pos.y += player.speed;
    }
    else if ( player.pos.y - player.speed > player.targetPos.y ) {
      //move up
      player.avatar_animation = 1;
      player.pos.y -= player.speed;
    }
    else {
      player.pos.x = player.targetPos.x;
      player.pos.y = player.targetPos.y;
      player.avatar_animation = 0;
    }
  }

  return {
    draw: draw,
    animateSprite: animateSprite
  };
}( _graph, _player ));
