/**
  * Linear movement
  */
Crafty.c('Moving', {
  init: function() {
    this._speed = {x:0,y:0};
    this.bind('EnterFrame', function() {       
      if (this._speed.x === 0 && this._speed.y === 0) return;
      this.x += this._speed.x;
      this.y += this._speed.y;
    });
  },
  speed: function(x,y) {
    this._speed.x = x||this._speed.x;
    this._speed.y = y||this._speed.y;
  }
});

