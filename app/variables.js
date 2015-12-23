var _csv = document.getElementById( 'cvs' ),
    _graph = _csv.getContext( '2d' ),
    _frame_rate = 0,
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
      avatar: {
        sprite_url: './sprites/avatar_a.png',
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
    },

    _players = {};
