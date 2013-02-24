Crafty.c('Turning', {
  init: function() {
    this.angV = 1;
    this.origin(15, 15);
    this.bind('EnterFrame', function(d) {
      if (d.frame%5>0) return;
      if (Crafty.math.randomInt(0, 500)===0) this.angV += Crafty.math.randomInt(-10, 10)/10;
      this.rotation += this.angV;
    });
  }
});