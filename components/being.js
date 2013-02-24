/**
  * A Being is a creature
  *   has a gender (Male/Female)
  *   has an age (0..100) represented by size
  */
Crafty.c('Being', {

  init: function() {
    this._age = 0;
    
    // 50%50 chance of being a male/female
    if (Crafty.math.randomInt(0, 1) === 0)
      this.addComponent('Male');
    else
      this.addComponent('Female');
    
    this.bind('EnterFrame', function(d) {
      this._ageing(d.frame);
      if (this._age <= 20) this.w = this.h = 10 + this._age/2;
    });
    
  },
  
  age: function(age) {
    this._age = age;
  },
  
  /**
    * Get older
    */
  _ageing: function(frame) {
    if (frame%50>0) return;                     // Every 50 frames...
    this._age++;
    if (this._age > 100) this.die();            // die at age 100
  },
  
  die: function() {
    this.destroy();
    console.log('Died');
  }
  
});