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
