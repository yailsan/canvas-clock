

function Clock(options) {
	this.canvas = options.canvas;
	this.ctx = options.context;
	this.date = options.date;
	this.position = {
		x: options.position.x,
		y: options.position.y
	};
	this.radius = options.radius;
	this.lineWidth = options.lineWidth || {
		seconds: 10,
		minutes: 11,
		hours: 12
	};
	this.colors = options.colors || {
		seconds: '#b54b33',
		minutes: '#98b467',
		hours: '#02929a',
		time: '#07a0b2',
		date: '#0c8c97',
		city: '#b54b33'
	};
	this.shadow = options.shadow || false;
	this.shadowBlur = options.shadowBlur || 15;
	this.city = options.city || '';
}


Clock.prototype = {
	dateObj: function() {
		var time = {},
			now = this.date;

		
		time.date = now.toLocaleDateString();
		time.time = now.toLocaleTimeString();
		time.day = now.getDay();
		time.seconds = now.getSeconds();
		time.milliseconds = time.seconds + (now.getMilliseconds() / 1000);
		time.minutes = now.getMinutes() + (time.seconds / 60);
		time.hours = now.getHours() + (time.minutes / 60);

		return time;
	},

	grad2Rad: function(grad) {
		return (Math.PI / 180) * grad;
	},

	time2grad: function(time, timeCount) {
		return this.grad2Rad((360 / timeCount) * time) + this.grad2Rad(270);
	},

	drawArc: function(radius, start, end, lineWidth, color) {
		var ctx = this.ctx;

		ctx.save();
		ctx.strokeStyle = color;
		if (this.shadow) {
			ctx.shadowColor = color;
			ctx.shadowBlur = this.shadowBlur;
		}
		ctx.lineWidth = lineWidth;

		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, radius, start, end);
		ctx.stroke();
		ctx.restore();
	},

	drawText: function(text, font, color, posx, posy) {
		this.ctx.fillStyle = color;
		this.ctx.font = font;
		this.ctx.textAlign = 'center';

		this.ctx.fillText(text, posx, posy);
	},

	start: function() {
		var now = this.dateObj();

		this.ctx.clearRect(this.position.x - this.radius - 70, this.position.y - this.radius - 70, (this.radius + 70) * 2, (this.radius + 70) * 2);
		//this.ctx.strokeRect(this.position.x - this.radius - 70, this.position.y - this.radius - 70, (this.radius + 70) * 2, (this.radius + 70) * 2);

		// seconds
		this.drawArc(this.radius, this.grad2Rad(270), this.time2grad(now.milliseconds, 60), this.lineWidth.seconds, this.colors.seconds);

		// minutes
		this.drawArc(this.radius + 30, this.grad2Rad(270), this.time2grad(now.minutes, 60), this.lineWidth.minutes, this.colors.minutes);

		// hours
		this.drawArc(this.radius + 60, this.grad2Rad(270), this.time2grad(now.hours, 24), this.lineWidth.hours, this.colors.hours);

		// text
		this.drawText(now.time, '30px Arial, Helvetica', this.colors.time, this.position.x, this.position.y);
		this.drawText(now.date, '16px Arial, Helvetica', this.colors.date, this.position.x, this.position.y + 20);
		this.drawText(this.city, '16px Arial, Helvetica', this.colors.city, this.position.x, this.position.y + 38);
	}
};