Crafty.c('Squishy', {
  init: function() {
    this.squishRate = {w:0.1,h:0.1};
    this.squishSize = {w:30, h:30};
    this.bind('EnterFrame', function(d) {
      if (d.frame%15 > 0) return; // Slow down
/*      if (Crafty.math.randomInt(0, 10)===0) {
        this.squishRate.w = Crafty.math.randomInt(1, 3)/100;
        if (Crafty.math.randomInt(0, 1)===0) this.squishRate.w *= -1; // 50/50 Grow/Shrink
      }*/
      this.w = Math.max(this.squishSize.w/2, Math.min(this.squishSize.w, this.w*(1+this.squishRate.w)));
      var relW = this.w/this.squishSize.w;
      if (relW <= 0.5 || relW >= 1) this.squishRate.w *= -1; // Re-bounce
      
      this.squishRate.h = this.squishRate.w;
      this.h = Math.max(this.squishSize.h/2, Math.min(this.squishSize.h, this.h*(1+this.squishRate.w)));
      //this._element.style.backgroundSize = 'cover'; //Math.floor(this.w)+'px '+Math.floor(this.h)+'px';
      //console.log(this._element.style, this.w, this.h, this._element.style.backgroundSize);
      //if (this.h === this.squishSize.h) this.squishRate.h *= -1;
      //debug([this.w, this.squishRate.w, this.h, this.squishRate.w]);
    });
  }
});