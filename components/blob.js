Crafty.sprite(30, 'img/blob1.png', { blob1: [0, 0]});
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
});