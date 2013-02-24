window.count = 0;
Crafty.c('Sex', {

  init: function() {
    
    this.requires('Collision');     // Must collide to have sex
    this.requires('Bounce');        // Use bounce to avoid too many hits
    
    this._gender = this.has('Male') ? 'Male' : 'Female';
    
    // Fertility rate (chance of impregnation)
    this._fertility = Crafty.math.randomInt(2,8)/10;
    this.alpha = 0.2+this._fertility;
    
    this.onHit('Sex', function(p) {

      var partner = p[0].obj;
      
      // No same-sex copulation
      if (partner.has(this._gender)) return;

      var female = this._gender === 'Female' ? this : partner;
      var male   = this._gender === 'Male' ? this : partner;

if (window.test) console.log(this._age, partner._age, female._pregnant);
      // No underage sex copulation
      if (this._age<20 || partner._age<20) return;
if (window.test) console.log('a1');
      // Already pregnant
      if (female._pregnant) return;
if (window.test) console.log('a2', female._fertility, male._fertility);
      var oomf = (female._fertility + male._fertility)/2;
      var conception = Math.random();
      console.log('Conception', conception, oomf);
      if (oomf > conception) {
        female.conceive();
        female._fertility -= 0.1; // Each pregnancy reduces fertility
      }
      
    });
    
  }
  
});