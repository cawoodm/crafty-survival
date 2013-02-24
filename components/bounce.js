Crafty.c('Bounce', {

  init: function() {
    
    this.requires('Collision');

    // Bounce back
    this.onHit('Collision', function(p) {
      //console.log('Hit', p);

      if (!this._speed) return;
      var partner = p[0].obj;

      var overlap = {};
      if (this.x < partner.x) // Impact from right
        overlap.x = this.x + this.w - partner.x;
      else
        overlap.x = this.x - (partner.x + partner.w);

      if (this.y < partner.y) // Impact from below
        overlap.y = this.y + this.h - partner.y;
      else
        overlap.y = this.y - (partner.y + partner.h);

      if (Math.abs(overlap.x) < Math.abs(overlap.y)) {
        //console.log('Changing x from ', this.x, 'by', overlap.x, 'to', this.x-overlap.x);
        this.x -= overlap.x;
        if (overlap.x) this._speed.x *= -1;
      } else {
        this.y -= overlap.y;
        if (overlap.y) this._speed.y *= -1;
      }
    });
  
  }
  
});