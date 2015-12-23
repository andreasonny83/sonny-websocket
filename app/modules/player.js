var $_PLAYER = (function( graph, player ) {

  function drawPlayers( players ) {
    for ( var i in players ) {
      animateSprite( players[i] );

      if ( players[i].avatar && players[i].avatar.ready ) {
        graph.drawImage(
          players[i].avatar.avatar,
          0, 0, players[i].avatar.sprite_size.w, players[i].avatar.sprite_size.h, // clip size
          players[i].pos.x, players[i].pos.y, // where on canvas
          players[i].avatar.sprite_size.w, players[i].avatar.sprite_size.h // image size to draw
        );
      }
    }
  }

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

  function animateSprite( targetPlayer ) {
    if ( targetPlayer.pos.x - targetPlayer.speed > targetPlayer.targetPos.x ) {
      //move left
      targetPlayer.avatar.animation = 2;
      nextFrame();
      targetPlayer.pos.x -= targetPlayer.speed;
    }
    else if ( targetPlayer.pos.x + targetPlayer.speed < targetPlayer.targetPos.x ) {
      //move right
      targetPlayer.avatar.animation = 3;
      nextFrame();
      targetPlayer.pos.x += targetPlayer.speed;
    }
    else if ( targetPlayer.pos.y + targetPlayer.speed < targetPlayer.targetPos.y ) {
      //move down
      targetPlayer.avatar.animation = 0;
      nextFrame();
      targetPlayer.pos.y += targetPlayer.speed;
    }
    else if ( targetPlayer.pos.y - targetPlayer.speed > targetPlayer.targetPos.y ) {
      //move up
      targetPlayer.avatar.animation = 1;
      nextFrame();
      targetPlayer.pos.y -= targetPlayer.speed;
    }
    else {
      targetPlayer.pos.x = targetPlayer.targetPos.x;
      targetPlayer.pos.y = targetPlayer.targetPos.y;
      targetPlayer.avatar.animation = 0;
      targetPlayer.avatar.frameIndex = 0;
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
    drawPlayers: drawPlayers,
    animateSprite: animateSprite
  };
}( _graph, _player ));
