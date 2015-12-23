(function( c, graph, board, player, players, frame_rate ){
  var avatar = new Image();
  avatar.src = player.avatar.sprite_url;
  var frame_rate = frame_rate || 0;

  // Move avar wher the user click on the map
  document.getElementById( 'cvs' ).addEventListener( 'click', movePlayerTo, false );

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
    console.log( 'loading...' );
    board.screenHeight = document.body.offsetHeight;
    board.screenWidth  = document.body.offsetWidth;

    player.pos.x = player.targetPos.x = parseInt(board.screenWidth / 2);
    player.pos.y = player.targetPos.y = parseInt(board.screenHeight / 2);

    avatar.onload = spriteReady();
  };

  function spriteReady() {
    console.log( 'App ready to rock!' );

    startGame( player );
  }

  function startGame( player ) {
    playerName = player.name;
    playerType = player.type;

    document.getElementById( 'player_info' ).querySelector( '.player_name' ).innerHTML = "hello " + player.name;
    document.querySelector( '#frame_rate' ).value = frame_rate;
    document.querySelector( '#player_speed' ).value = player.speed;

    animloop();
  }

  function animloop() {
    if ( _frame_counter < frame_rate ) {
      _frame_counter++;
      requestAnimFrame( animloop );
      return;
    }

    gameLoop();

    _frame_counter = 0;
    requestAnimFrame( animloop );
  }

  function gameLoop() {
    frame_rate  = parseInt( document.querySelector( '#frame_rate' ).value );
    player.speed = parseInt( document.querySelector( '#player_speed' ).value );
    player.name = document.querySelector( '#player_name' ).value;
    document.getElementById( 'player_info' ).querySelector( '.player_name' ).innerHTML = "hello " + player.name;

    // Borad
    $_GRID.drawBoard();
    $_GRID.drawGrid();

    // Player
    // $_PLAYER.draw( avatar, true );
    $_PLAYER.animateSprite( player );
    $_PLAYER.draw( avatar, false );

    $_PLAYER.drawPlayers( players );
  }

  function movePlayerTo( event ) {
    var id = socket.io.engine.id;
    player.targetPos.x = event.clientX - (player.avatar.sprite_size.w / 2);
    player.targetPos.y = event.clientY - (player.avatar.sprite_size.h / 2);
    socket.emit( 'player_pos', { user_id: id, pos: player.pos, targetPos: player.targetPos } );
  }

}(_csv, _graph, _board, _player, _players, _frame_rate));
