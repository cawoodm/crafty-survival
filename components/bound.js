/**
  * Keep a 2D entity inside a bounded box
  */
Crafty.c('Bound', {
  init: function() {
    this._rebound = true;
    this.bind("EnterFrame", function(e) {
      if (!this.b) return;
      //Crafty.myGame.debug([Math.floor(this.x), Math.floor(this.x), Math.floor(this._speed.x*10), Math.floor(this._speed.y*10)]);
      if (typeof this.b.minY != 'undefined' && this.y < this.b.minY) {
        this.y = this.b.minY + 1;
        if (this._speed) this._speed.y *= -1;
      } else if (typeof this.b.maxY != 'undefined' && this.y > this.b.maxY) {
        this.y = this.b.maxY - 1;
        if (this._speed) this._speed.y *= -1;
      }
      if (typeof this.b.minX != 'undefined' && this.x < this.b.minX) {
        this.x = this.b.minX + 1;
        if (this._speed) this._speed.x *= -1;
      } else if (typeof this.b.maxX != 'undefined' && this.x + this.w > this.b.maxX) {
        this.x = this.b.maxX - this.w - 1;
        if (this._speed) this._speed.x *= -1;
      }
    });
  },
  bound: function(bounds) {
    this.b = {
      minX: bounds.minX,
      minY: bounds.minY,
      maxX: bounds.maxX,
      maxY: bounds.maxY
    };
    return this;
  }
});

