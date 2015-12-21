var _csv = document.getElementById( 'cvs' ),
    _graph = _csv.getContext( '2d' ),
    _frame_rate = 20,
    _frame_counter = 0,

    _board = {
      background: '#CCC',
      gridColor: '#333',
      gridAlpha: 0.25,
      gridSize: 50,
      screenWidth: null,
      screenHeight: null
    },

    _player = {
      name: 'Player',
      type: 'player',
      avatar_url: './sprites/avatar_a.png',
      avatar_size: {
        w: 150,
        h: 120
      },
      avatar_animation: 0,
      speed: 5,
      pos: {
        x: 0,
        y: 0
      },
      targetPos: {
        x: 0,
        y: 0
      }
    };
