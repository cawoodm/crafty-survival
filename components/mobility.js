/**
  * Arbitrary movement
  */
Crafty.c('Mobility', {
  init: function() {
    this._speed = {x:0.1,y:0.1};
    this.acc = {x:0.1,y:0.1};
    this.accRange = 10;
    this.bind('EnterFrame', function() {       
      if (Crafty.math.randomInt(0, 100)===0) this.acc.x = Crafty.math.randomInt(-this.accRange, this.accRange);
      if (Crafty.math.randomInt(0, 100)===0) this.acc.y = Crafty.math.randomInt(-this.accRange, this.accRange);
      this.x += this._speed.x*this.acc.x;
      this.y += this._speed.y*this.acc.y;
    });
  }
});

