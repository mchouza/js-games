var blocksFactory= {
	idBlock: 0,
	
	/*
	 * Object that represents each block of a shape
	 */
	
	/* Constructor for the object Block
	 * idBlock: Block ID
	 * xi: initial x coordinate (left upper corner)
	 * yi: initial y coordinate (right upper corner)
	 * color: block's color
	 * containerID: ID of the block's container (div)
	 */
	Block: function (idBlock, xi, yi, color, containerID){
			var idContainer="", id="",		
				x= 0,y= 0;
			var that= this;
			
			/*
			 * Returns x coordinate for the block (upper left corner)
			 */
			this.getX= function(){
				return x;
			}
			
			/*
			 * Returns y coordinate for the block (upper left corner)
			 */
			this.getY= function(){
				return y;
			}
			
			/*
			 * Returns the center of the block's coordinates
			 * Returns object {x: <value x>, y: <value y>}
			 */
			this.getCenter= function(){
				return{
					"x": x + BSIZE/2,
					"y": y + BSIZE/2
				}
			}
			
			/*
			 * Makes the block dissapear
			 */
			this.fade= function(){
				$("#"+ id).fadeOut("normal", function(){
					$("#"+ id).remove();
				});
			}
			
			/*
			 * Returns whether there's enough room for the block to rotate (true|false)
			 * origin: object with the coordinates for the rotation fixed point
			 * sign: sign (-1 or 1) to rotate the block clockwise or anticlockwise
			 * grid: Grid object
			 */
			this.canRotate= function(origin, sign, grid){
				var center= that.getCenter();
				
				var v= {x: center.x-origin.x, y: center.y - origin.y};
				var v2= {x:0, y:0};
				
				v2.x= sign * v.y; v2.y= -sign * v.x;
				
				v2.x += origin.x;
				v2.y += origin.y;
				
				var dx= v2.x - center.x, dy= v2.y - center.y;
				
				var mov= grid.maxMove(that, dx, dy);
				if (mov == null) return false;
				
				return ((dx == mov.deltaX) && (dy == mov.deltaY));
			}
			
			/*
			 * Rotates the block around the origin
			 * origin: object with the coordinates for the rotation fixed point
			 * sign: sign (-1 or 1) to rotate the block clockwise or anticlockwise
			 */
			this.rotate= function(origin, sign){
				var center= that.getCenter();
				var v= {x: center.x-origin.x, y: center.y - origin.y};
				var v2= {x:0, y:0};
				
				v2.x= sign * v.y; v2.y= -sign * v.x;
				
				v2.x += origin.x;
				v2.y += origin.y;
				
				that.move(v2.x - center.x, v2.y - center.y);
			}
			
			/*
			 * Moves the block dx pixels in x and dy pixels in y
			 * dx: offset in x
			 * dy: offset in y
			 */
			this.move= function (dx, dy){
				var lx= x + dx;
				var ly= y + dy;
				
				$("#"+ id).css({"margin-left": (lx + "px"), "margin-top": (ly + "px")});
				
				x= lx; y= ly;
			}
		
		/*Constructor sentences*/
		id= idBlock;
		idContainer= containerID;
		
		$("#" + idContainer).prepend("<div id=\"" + id + "\"/>");
		$("#"+ id).addClass("block");
		$("#" + id).css({"background-color": color});
		
		this.move(xi,yi);
	},
	
	buildBlock: function(x, y, color, idContainer){
		var idB= "divB" + idContainer + ((this.idBlock)++);
		var block= new this.Block(idB, x, y, color, idContainer);
		
		return block;
	}

}