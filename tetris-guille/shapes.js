var shape = {
	x:0,
	y:0,
 	blocks: [],
	
	init: function (x, y, container){
		var ret= this._init();
		var center= this.center(ret.offsets, container, x, y);
		
		for (var i= 0; i < 4; i++){
			this.blocks[i]= blocksFactory.buildBlock(
								center.x + ret.offsets[i].x, 
								center.y + ret.offsets[i].y, 
								ret.color, 
								container
							);
		}
		
		this.x= center.x; this.y= center.y;
		
		return this;
	},
	
	center: function(vecOffsets, container, x, y){
		var width= parseInt($('#'+ container).css("width"));
		var height= parseInt($('#'+ container).css("height"));
		
		var minX=width, maxX= 0, minY= height, maxY= 0;
		var ret = {"x": x, "y": y};
		var i; var delta;
		
		if (x === null){
			for (i= 0; i < 4; i++){
				minX= Math.min(minX, vecOffsets[i].x);
				maxX= Math.max(maxX, vecOffsets[i].x + BSIZE);
			}
			
			delta= maxX - minX;
			ret.x= this.bestFit((width  - delta)/2, container);
		}
		
		if (y === null){
			for (i= 0; i < 4; i++){
				minY= Math.min(minY, vecOffsets[i].y);
				maxY= Math.max(maxY, vecOffsets[i].y + BSIZE);
			}
			
			delta= maxY - minY;
			ret.y= this.bestFit((height  - delta)/2, container);
		}
		
		return ret;
	},
	
	bestFit: function(val, container){
		if (container === "next") return val;
		
		return Math.round(val / BSIZE) * BSIZE;
	},
	
	getCenter: function(){
		var minX=0, maxX= MAXWIDTH, minY= 0, maxY= MAXHEIGHT;
		
		for (var i= 0; i < 4; i++){
			minX= Math.max(minX, this.blocks[i].getX());
			minY= Math.max(minY, this.blocks[i].getY());
			
			maxX= Math.min(maxX, this.blocks[i].getX() + BSIZE);
			maxY= Math.min(maxY, this.blocks[i].getY() + BSIZE);
		}
		
		return {
			x: this.bestFit(minX + (maxX - minX)/2),
			y: this.bestFit(minY + (maxY - minY)/2)
		}
	},
	
	minDelta: function(d1, d2){
		return (Math.abs(d1) < Math.abs(d2)) ? d1 : d2;
	},
	
	maxMove: function(dx, dy, grid){
		var ret= {deltaX: dx, deltaY: dy};
		var currMove;
		
		for (var i= 0; i < 4; i++){
			currMove= grid.maxMove(this.blocks[i], dx, dy);
			if (currMove === null) return null;
			
			ret.deltaX= this.minDelta(ret.deltaX, currMove.deltaX);
			ret.deltaY= this.minDelta(ret.deltaY, currMove.deltaY);	
		}
		
		return ret;
	},
	
	move: function(dx, dy, grid){
		var d= this.maxMove(dx, dy, grid);
		
		if (d === null) {
			if (this.y === 0) {
				throw {
					gameover: true
				};
			}
			return false;
		}
		
		for (var i= 0; i < 4; i++){
			this.blocks[i].move(d.deltaX, d.deltaY);
		}
		
		this.x += d.deltaX;
		this.y += d.deltaY;
		
		return true;
	},
	
	rotate: function(sign, grid){
		var center= this.getCenter();
		var rot= true;
		
		for (var i= 0; i < 4; i++){
			rot &= this.blocks[i].canRotate(center, sign, grid);
		}
		
		if (!rot){
			return this;
		}
		
		for (var i= 0; i < 4; i++){
			this.blocks[i].rotate(center, sign);
		}
		
		return this;
	}
};
 
var shapeI= jQuery.extend(true, {}, shape);

shapeI._init= function(){
		var vecOffsets= [];
		
		for (var i= 0; i < 4; i++){
			vecOffsets[i] = {
				"x": (i * BSIZE),
				"y": 0
			};
		}
		
		return {
			color: "red",
			offsets: vecOffsets
		}
};
 
var shapeJ= jQuery.extend(true,{}, shape);
 
shapeJ._init = function(){
 		var vecOffsets= [];
		
		vecOffsets[0] = {"x": 0,"y": 0};
		vecOffsets[1]= {"x": BSIZE, "y": 0};
		vecOffsets[2]= {"x": 0, "y": BSIZE};
		vecOffsets[3]= {"x": 0, "y": (2*BSIZE)};	
		
		return {
			color: "magenta",
			offsets: vecOffsets
		}
};

var shapeL= jQuery.extend(true,{}, shape);
 
shapeL._init = function(){
 		var vecOffsets= [];
		
		vecOffsets[0]= {"x": 0, "y": 0};
		vecOffsets[1]= {"x": BSIZE, "y": 0};
		vecOffsets[2]= {"x": BSIZE, "y": BSIZE};
		vecOffsets[3]= {"x": BSIZE, "y": (2*BSIZE)};
		
		return {
			color: "yellow",
			offsets: vecOffsets
		}
};

var shapeO= jQuery.extend(true,{}, shape);

shapeO._init = function(){
 		var vecOffsets= [];
		
		vecOffsets[0]= {"x": 0, "y": 0};
		vecOffsets[1]= {"x": BSIZE, "y": 0};
		vecOffsets[2]= {"x": 0, "y": BSIZE};
		vecOffsets[3]= {"x": BSIZE, "y": BSIZE};
		
		return {
			color: "cyan",
			offsets: vecOffsets
		}
};

shapeO.rotate= function(sign){ return this;};

var shapeS= jQuery.extend(true,{}, shape);

shapeS._init = function(){
 		var vecOffsets= [];
		
		vecOffsets[0]= {"x": BSIZE, "y": 0};
		vecOffsets[1]= {"x": (2*BSIZE), "y": 0};
		vecOffsets[2]= {"x": 0, "y": BSIZE};
		vecOffsets[3]= {"x": BSIZE, "y": BSIZE};
		
		return {
			color: "lime",
			offsets: vecOffsets
		}
};

var shapeT= jQuery.extend(true,{}, shape);

shapeT._init = function(){
 		var vecOffsets= [];
		
		vecOffsets[0]= {"x": BSIZE, "y": 0};
		vecOffsets[1]= {"x": 0, "y": BSIZE};
		vecOffsets[2]= {"x": BSIZE, "y": BSIZE};
		vecOffsets[3]= {"x": (2*BSIZE), "y": BSIZE};
		
		return {
			color: "olive",
			offsets: vecOffsets
		}	
};

var shapeZ= jQuery.extend(true,{}, shape);

shapeZ._init = function(){
 		var vecOffsets= [];
		
		vecOffsets[0]= {"x": 0, "y": 0};
		vecOffsets[1]= {"x": BSIZE, "y": 0};
		vecOffsets[2]= {"x": BSIZE, "y": BSIZE};
		vecOffsets[3]= {"x": (2*BSIZE), "y": BSIZE};
		
		return {
			color: "blue",
			offsets: vecOffsets
		}		
};

var shapesFactory= {
	nextShapeIndex: -1,
	protoShapes: [this.shapeI, this.shapeJ, this.shapeL, this.shapeO, this.shapeS, this.shapeT, this.shapeZ],
	
	_shapeType: function(){
		return Math.floor(Math.random() * this.protoShapes.length);
	},
	
	_buildShape: function(x, y, index){
		var sh= jQuery.extend(true, {}, this.protoShapes[index]);
		
		return sh;
	},
	
	buildShape: function(x,y){
		var ret= null;
		
		if (this.nextShapeIndex === -1){
			ret= this._buildShape(x, y, this._shapeType());
		}else{
			ret= this._buildShape(x, y, this.nextShapeIndex);
		}
		
		this.nextShapeIndex= this._shapeType();
		
		ret.init(x,y, "container");
		$('#next').children('div').remove();
		
		var previewShape= this._buildShape(x, y, this.nextShapeIndex);
		previewShape.init(null, null, "next");
		
		return ret;
	}
	
};