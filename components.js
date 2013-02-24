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
  
});Crafty.sprite(30, 'img/blob1.png', { blob1: [0, 0]});
Crafty.sprite(30, 'img/blob2.png', { blob2: [0, 0]});
Crafty.sprite(30, 'img/blob3.png', { blob3: [0, 0]});
Crafty.sprite(30, 'img/blob4.png', { blob4: [0, 0]});
Crafty.sprite(30, 'img/blob5.png', { blob5: [0, 0]});
Crafty.sprite(30, 'img/blob6.png', { blob6: [0, 0]});
Crafty.sprite(30, 'img/blob7.png', { blob7: [0, 0]});
Crafty.sprite(30, 'img/blob8.png', { blob8: [0, 0]});
Crafty.sprite(30, 'img/blob9.png', { blob9: [0, 0]});
Crafty.c("Blob", {
	init: function () {
	  this.w = this.h = 30;
		this.addComponent('blob'+Crafty.math.randomInt(1,9));
	}
});Crafty.c('Bounce', {

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
  
});/**
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

Crafty.c("Colorful", {
  init: function () {
    this.requires('Color');
	  var arr=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    var n1=Math.round(Math.random()*15);
    var n2=Math.round(Math.random()*15);
    var n3=Math.round(Math.random()*15);
    var n4=Math.round(Math.random()*15);
    var n5=Math.round(Math.random()*15);
    var n6=Math.round(Math.random()*15);
    var hexno  ="#"+arr[n1]+""+arr[n2]+""+arr[n3]+""+arr[n4]+""+arr[n5]+""+arr[n6];
    this.color(hexno);
    this.alpha = Crafty.math.randomInt(6,8)/10;
	}
});
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
Crafty.c("Male", {
  init: function () {
    this.requires('Color, Sex');
	  /*
	  var arr=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    var n=Crafty.math.randomInt(10,13);
    var hexno  ="#00"+arr[n];
    this.color(hexno);
    this.alpha = Crafty.math.randomInt(7,10)/10;
    */
    this.color('blue');
    this.attach(Crafty.e('2D, Text').text('1'));
	}
});
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
});window.count = 0;
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
  
});Crafty.c('Sounds', {
  init: function() {
    var sounds = {
      'Conceive': 'audio/conceive.mp3',
      'Birth':    'audio/cry0.mp3'
    };
    for (var s in sounds) {
      Crafty.audio.add(s, sounds[s]);
      (function(en, event){
        en.bind(event, function() {
          Crafty.audio.play(event, 1, 0.1);
        });
      }(this, s));
    }
  }
});Crafty.c('Squishy', {
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
});Crafty.c('Turning', {
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