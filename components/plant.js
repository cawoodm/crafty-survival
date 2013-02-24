Crafty.c('Plant', {
  init: function() {
    if (this.has('Mobility')) return; // If mobil, can't be a plant
    this.z = 0;
    this.color('green');
    this.bind('EnterFrame', function() {       
      if (Crafty.math.randomInt(0, 500)===0) this.w = this.h += Crafty.math.randomInt(-5, 5)/10;
      //console.log('EnterFrame', this._entityName, this._x, this.speed.x);
    });
  }
});