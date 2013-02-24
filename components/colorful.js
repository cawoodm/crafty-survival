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
