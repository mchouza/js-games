/*
 * Objects that keeps track of which cell are occupied and which are not
 */

/*
 * Constructor for the object Grid
 * statistics: object Stats
 */
function Grid(statistics){
		var mat= null, //matrix to determine which cells are free (== null) and which are not
			limitI= 0, limitJ= 0, //max index for the matrix for x and y, respectively
			stats= null;
			
		/*
		 * Based on the position (x or y) of a block, returns the cell index that block is on
		 * pos: position in pixels for the center of the cell (either in x or in y)
		 */
		function _cellNo(pos){
			return Math.floor((pos - (pos % BSIZE))/ BSIZE);
		}
		
		/*
		 * Returns the delta in pixels (in x or y) if cellIndex is in Range (greater or equal than 0, lower or equal than cellLimit). 
		 * If that's not the case, returns 0
		 * d: delta in pixels (in x or y)
		 * cellIndex: index for the cell
		 * cellLimit: cell index upper limit
		 */
		function _delta(d, cellIndex, cellLimit){
			if (cellIndex < 0) {
				return 0;
			}
			if (cellIndex >= cellLimit) {
				return 0;
			}
			return d;	
		}
		
		/*
		 * Fades a row filled with blocks
		 * j: row index
		 */
		function _fadeRow(j){
			for (var i= 0; i < limitI; i++){
				((mat[i])[j]).fade();
			}
		}
		
		/*
		 * Moves each row of blocks one cell downwards
		 * j: max row index
		 */
		function _moveRow(j){
			if (j <= 0) return;
			
			for (var i= 0; i < limitI; i++){
				((mat[i])[j])= ((mat[i])[j-1]);
				((mat[i])[j-1])= null;
				if (((mat[i])[j]) !== null) {
					((mat[i])[j]).move(0, BSIZE);
				}
			}
			_moveRow(j-1);
		}
		
		/*
		 * Checks whether a row if completely filled with blocks
		 * j: row index
		 */
		function _checkRow(j){
			for (var i = 0; i < limitI; i++){
				if ( ((mat[i])[j]) === null ) return false;
			}
			
			return true;
		}
		
		/*
		 * Checks whether each row whose index is <= j and >= 0 is filled,
		 * if that's true, fades the row and move the other ones downwards
		 * j: row index
		 */
		function _checkRows(j){
			if ( j < 0 ) return;
			
			if (_checkRow(j)){
				_fadeRow(j);
				stats.newLine();
				_moveRow(j);
				
				_checkRows(j);
			}
			
			_checkRows(j-1);
		}
		
		/*
		 * Marks a cell as occupied by a block
		 * block: block that is in a cell
		 */
		function _markBlock(block){
			var center= block.getCenter();
			
			var i= _cellNo(center.x, BSIZE);
			var j= _cellNo(center.y, BSIZE);
			
			((mat[i])[j])= block;
		}
		
		/*
		 * Returns the max move (offsets) in x and y for a particular block
		 * block: block pretended to be moved
		 * dx: pretended movement (offset in x)
		 * dy: pretended movement (offset in y)
		 * 
		 * returns object {deltaX: <value X>, deltaY: <valueY>} or null if the target cell is not empty
		 */
		this.maxMove= function (block, dx, dy){
			var center= block.getCenter();
			var ret= {deltaX: dx, deltaY: dy};
			
			var i= _cellNo(block.getX() + dx);
			var j= _cellNo(block.getY() + dy);
			
			ret.deltaX= _delta(dx, i, limitI);
			ret.deltaY= _delta(dy, j, limitJ);
			
			if (((dx != 0) || (dy != 0)) && ((ret.deltaX == 0) && (ret.deltaY == 0))) return null;
			
			if ( ((mat[i])[j]) !== null){
				if (dy != 0){
					return null;
				}
				return {deltaX: 0, deltaY: 0};
			}
			
			return ret;
		}
	
		/*
		 * Marks the cells for shape as not empty
		 * shape: shape to be marked
		 */
		this.markShape= function(shape){
			for (var i= 0; i < 4; i++){
				_markBlock(shape.blocks[i]);
			}
			
			stats.newShape();
			_checkRows(limitJ);
		}
	
	
	/*Constructor sentences*/
	stats= statistics;
	limitI= MAXWIDTH / BSIZE;
	limitJ= MAXHEIGHT/ BSIZE;
	
	//Loading initial data for the matrix
	mat= [];
	for (var i = 0; i <= limitI; i++) {
		mat[i]= []
		for (var j = 0; j <= limitJ; j++) {
			((mat[i])[j])= null;
		}
	}

}
