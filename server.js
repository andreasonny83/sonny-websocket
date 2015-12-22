var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use( express.static( __dirname ) );
app.set( 'port', ( process.env.PORT || 3000 ) );

app.get( '/', function( req, res ) {
  res.sendFile( __dirname + '/index.html');
});

io.on( 'connection', function( socket ) {
  console.log('a user connected');
  io.emit( 'notification', 'new user connected.' );

  socket.on( 'disconnect', function(){
    console.log( 'a user disconnected' );
    io.emit( 'notification', 'a user disconnected.' );
  });

  socket.on( 'user status', function( msg ) {
    console.log( msg );
  });

  socket.on( 'chat', function( data ) {
    console.log( data.sender );
    console.log( data.msg );

    var message = '<' + data.sender + '> ' + data.msg;
    io.emit( 'chat', message );
  });
});

http.listen( app.get( 'port' ), function(){
  console.log('listening on *:' + app.get( 'port' ) );
});
