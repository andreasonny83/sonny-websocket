var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use( express.static( __dirname + '/..' ) );
app.set( 'port', ( process.env.PORT || 3000 ) );

app.get( '/', function( req, res ) {
  res.sendFile( __dirname + '../index.html');
});

// io.use( function( socket, next ) {
//   if ( socket.request.headers.cookie ) {
//     console.log('ok');
//     return next();
//   }
//
//   console.log( 'Authentication error' );
//   console.log( 'test' );
// });
//
// io.set('authorization', function (handshakeData, accept) {
//   user_id = handshakeData.headers.cookie;
//   accept(null, true);
// });

function newPlayer( cookie ) {
  var id = cookie.replace( /^io=(.+)/, '$1' );

  var new_player = {
    name: 'Player',
    id: id,
    type: 'player',
    avatar: {
      sprite_url: './sprites/avatar_a.png',
      // avatar: new Image(),
      ready: false,
      sprite_size: {
        w: 150,
        h: 120
      },
      animation: 0,
      frameIndex: 0,
      frameSpeed: 3,
      frameSpeedIndex: 0,
      frames: 6
    },
    speed: 7,
    pos: {
      x: 0,
      y: 0
    },
    targetPos: {
      x: 0,
      y: 0
    }
  };

  return new_player;
}

io.on( 'connection', function( socket ) {
  console.log('a user connected');
  io.emit( 'notification', 'user connected.' );

  socket.on( 'pong', function( data ) {
    console.log("Pong received from client: " + data);
  });

  sendHeartbeat();

  function sendHeartbeat() {
    io.sockets.emit('ping', { beat : 1 });
    setTimeout( sendHeartbeat, 25000 );
  }

  socket.on( 'disconnect', function( data ) {
    console.log( 'a user disconnected' );
    io.emit( 'notification', 'user disconnected.' );
  });

  io.on( 'event', function( data )  {
    console.log('event:');
    console.log(data);
  });

  socket.on( 'user status', function( msg ) {
    console.log( msg );
  });

  socket.on( 'player_pos', function( data ) {
    console.log( data );
    io.emit( 'player_pos', data );
  });

  socket.to( 'chat' ).emit('an event', { some: 'data' });

  socket.on( 'chat', function( data ) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    if ( ! data.msg || data.msg === '' ) return;

    var message = '[' + h + ':' + m + ':' + s + '] <' + data.sender + '> ' + data.msg;
    io.emit( 'chat', message );
  });

});

http.listen( app.get( 'port' ), function(){
  console.log('listening on http://localhost:' + app.get( 'port' ) );
});
