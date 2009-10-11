var MAXWIDTH= parseInt($('#container').css("width"));
var MAXHEIGHT= parseInt($('#container').css("height"));
var BSIZE= 16;

$(document).ready(
		function(){
			var stats= new Stats("level", "points", "lines");
			var grid= new Grid(stats);
			
			var start= false;
			var x= null, y= 0;
			
			var sh= shapesFactory.buildShape(x, y);	
				
			var autoMove = function(){
				//try {
					if (!sh.move(0, BSIZE, grid)) {
						grid.markShape(sh);
						sh = shapesFactory.buildShape(x, y);
					}
					
					if (start) {
						setTimeout(autoMove, stats.getSpeed());
					}
				/*}catch(error){
					if (error.gameover === true){
						alert("Game Over");
						$("#btnStop").click();
					}else{
						alert(error);
					}
				}*/
			}
			
			$("#btnStart").bind("click", function(){
				if (start) return;
				setTimeout(autoMove,  stats.getSpeed());
				start= true;
			});
			
			$("#btnStop").bind("click", function(){
				start= false;	
			});
			
			$("body").bind("keydown", function(e){
				if (!start) return;
				switch(e.which){
					case 37:
						sh.move(-BSIZE,0, grid);
						break;
					case 39:
						sh.move(BSIZE,0, grid);
						break;
					case 38:
						sh.rotate(1, grid);
						break;
					case 40:
						sh.rotate(-1, grid);
						break;
				}
			});
		}
)

