/*global window*/
(function(window, document, undefined) {
	var canvas = document.getElementById('clock'),
		ctx = canvas.getContext('2d'),
		now,

		clock1 = new Clock({
			canvas: canvas,
			context: ctx,
			position: {
				x: 200,
				y: 200
			},
			city: 'Mexico city',
			radius: 80
		}),

		clock2 = new Clock({
			canvas: canvas,
			context: ctx,
			position: {
				x: 600,
				y: 200
			},
			colors: {
				seconds: '#0A98BE',
				minutes: '#70A4AE',
				hours: '#56979D',
				time: '#56979D',
				date: '#56979D',
				city: '#0A98BE'
			},
			city: 'New York',
			radius: 80
		}),

		clock3 = new Clock({
			canvas: canvas,
			context: ctx,
			position: {
				x: 200,
				y: 600
			},
			colors: {
				seconds: '#0A98BE',
				minutes: '#70A4AE',
				hours: '#56979D',
				time: '#56979D',
				date: '#56979D',
				city: '#0A98BE'
			},
			city: 'London',
			radius: 80
		}),
		
		clock4 = new Clock({
			canvas: canvas,
			context: ctx,
			position: {
				x: 600,
				y: 600
			},
			city: 'Tokyo',
			radius: 80
		});

	function init() {
		now = new Date();
		clock1.date = now;
		clock2.date = new Date(now.getTime() + (1*1000*60*60));
		clock3.date = new Date(now.getTime() + (6*1000*60*60));
		clock4.date = new Date(now.getTime() + (13*1000*60*60));

		clock1.start();
		clock2.start();
		clock3.start();
		clock4.start();
	}

	function loop() {
		init();
		window.requestAnimationFrame(loop);
	}

	loop();
})(window, window.document, undefined);