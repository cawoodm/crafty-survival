Crafty.myGame = {};
Crafty.myGame.W = window.document.documentElement.clientWidth;
Crafty.myGame.H = window.document.documentElement.clientHeight-30;

Crafty.init(Crafty.myGame.W, Crafty.myGame.H);

Crafty.background('rgb(120,178,225)');
//Crafty.background('url(img/bg.jpg)');

Crafty.myGame._debug = Crafty.e('2D, DOM, Text')
  .attr({w: 200})
  .textColor('#ffff00');

var test = 0; // 2 = Normal(paused)
if (test === 1) {
  eBac({x:40,y:50}).addComponent('Mobility')
    .addComponent('Blob')
    .addComponent('Squishy')
    //.addComponent('Turning')
    .bound({minX: 0, minY: 0, maxX: 500, maxY: 500});
} else {
  for (var i=0; i<100; i++) {
    var x = Crafty.math.randomInt(0, 99);
    var y = Crafty.math.randomInt(0, 99);
    var en = eBac({x: x*Crafty.myGame.W/100, y: y*Crafty.myGame.H/100});
    
    /*
      addComp(en, 'Mobility', '70%');
      addComp(en, 'Turning', '50%');
    } else */
    if (addComp(en, 'Mobility', '70%')) {
      //addComp(en, 'Squishy', '50%');
      addComp(en, 'Blob', '50%');
      addComp(en, 'Squishy', '50%');
      addComp(en, 'Turning', '50%');
      addComp(en, 'Colorful', '90%');
    }
    else
      addComp(en, 'Plant', '100%');
  }
}

function addComp(en, component, chance) {
  // 20% becomes 4 so random 0 to 4 (1 in 5)
  var p = 100 / parseInt(chance, 10) - 1;
  if (Crafty.math.randomInt(0, p) === 0) {
    en.addComponent(component);
    return true;
  }
  return false;
}

function eBac(attr) {
  var sz = Crafty.math.randomInt(10, 30);
  var en = Crafty.e('2D, DOM, Color, Bound')
    .attr({
      x: attr.x,
      y: attr.y,
      w: sz,
      h: sz,
      z: 1
    })
    .color('silver')
    .bound({minX: 0, minY: 0, maxX: Crafty.myGame.W, maxY: Crafty.myGame.H})
  ;
  return en;
}

//Crafty.pause();
if (test === 2)
  window.setTimeout(function(){Crafty.pause();}, 100);

//Crafty.timer.step();

function debug(msg) {
  msg = [].concat(msg);
  msg = msg.map(function(m) {return Math.floor(m*100)/100;});
  Crafty.myGame._debug.text(msg.join(', '));
}