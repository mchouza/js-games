/*
 * Object that handles the game statistics
 * (level, points, speed of the game)
 */

/*
 * Constructor for the object Stats
 * idLevel: ID of the label that displays the level number of the game
 * idPoints: ID of the label that displays the points in the game so far
 * idLines: ID of the label that displays the number of lines cleared (filled) in the game so far
 */
function Stats(idLevel, idPoints, idLines){
		var level= 1, points= 0, lines= 0,
			levelID= "", pointsID= "", linesID="",
			
			/*Game constants*/
			SHAPEPOINTS= 21, LINEPOINTS= 53, NEWLEVELPOINTS= 101, LINESNEXTLEVEL= 3, 
			A= 90, B= 110;
		
		/*
		 * Displays level and points in the game
		 */
		function _display(){
			$(levelID).html(level);
			$(pointsID).html(points);
			$(linesID).html(lines);
		}
		
		/*
		 * Updates the number of lines filled in the game
		 */
		this.newLine= function(){
			points += (LINEPOINTS * level);
			lines++;
			
			if (lines == LINESNEXTLEVEL){
				lines= 0;
				level++;
				points += (NEWLEVELPOINTS * level);
			}
			
			_display();
		}
		
		/*
		 * Updates the number of shapes put in place during the game
		 */
		this.newShape= function(){
			points += (SHAPEPOINTS * level);
			_display();
		}
		
		/*
		 * Calculates the speed for the falling shapes, according to the level the player is on
		 */
		this.getSpeed= function(){
			return (B/level + A);
		}
	
	/*Constructor sentences*/
	
	levelID= "#" + idLevel;
	pointsID= "#" + idPoints;
	linesID= "#" + idLines;
		
	_display();
}
