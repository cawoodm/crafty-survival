Crafty.c('Female', {
  init: function () {
    this.requires('Color, Sex');
    this._pregnant = false;
    this._week = 0;
    this.color('#F88');
    this.bind('EnterFrame', function(d) {
      if (d.frame%50>0) return; // Reduce speed
      this.cycle();
    });
	},
	conceive: function() {
    this._pregnant = true;
    this.color('#F00');
    this.alpha = 1.0;
    Crafty.trigger('Conceive');
    console.log('Pregnant', this._age);
	},
	cycle: function() {
	 if (!this._pregnant) return;
	 this._week++;
	 if (this._week < 10)
	   this.w = this.h = this.h+1; // Grow by one pixel each week
	 else
	   this.birth();
	},
	birth: function() {
	  this._pregnant = false;
	  this._week = 0;
	  this.w = this.h = 20;
	  this.color('#F88');
	  this.alpha = 0.2+this._fertility;
    var en = eBac({
      x: this.x,
      y: this.y,
      w: 10
    });
    en.addComponent('Being')
      .addComponent('Mobility')
      .addComponent('Sex');
    en.speed = this.speed;
    Crafty.trigger('Birth');
	}
});
