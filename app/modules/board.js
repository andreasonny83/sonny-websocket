var $_GRID = (function( graph, board, csv ) {

  function drawBoard() {
    board.screenHeight = document.body.offsetHeight;
    board.screenWidth  = document.body.offsetWidth;

    csv.width  = board.screenWidth;
    csv.height = board.screenHeight;

    graph.fillStyle = board.background || '#CCC';
    graph.fillRect( 0, 0, board.screenWidth, board.screenHeight );
  }

  function drawGrid() {
    var gridSize = board.gridSize || 50;
    graph.lineWidth = '1px';
    graph.strokeStyle = board.gridColor || '#333';
    graph.globalAlpha = board.gridAlpha|| 0.25;
    graph.beginPath();

    for ( var x = 0; x < board.screenWidth; x += gridSize ) {
      graph.moveTo( x, 0 );
      graph.lineTo( x, board.screenHeight );
    }
    for ( var y = 0; y < board.screenHeight; y += gridSize ) {
      graph.moveTo( 0, y );
      graph.lineTo( board.screenWidth, y );
    }

    graph.stroke();
    graph.globalAlpha = 1;
  }


  return {
    drawBoard: drawBoard,
    drawGrid: drawGrid
  };

}( _graph, _board, _csv ));
