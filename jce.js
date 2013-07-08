var engine = {

    depth: 1,

    puzzle: 1,

    // gets all the possible moves in the board in a [["e2","e4"],["d2","d4"], ... ] format
    getPossibleMoves: function(position, turn) {
	 var moves = [];
	 
	 if (turn === "white") {
	     for (var k in position) {
		  
		  if (position[k] === position[k].toUpperCase()) {
		      var partialMoves = [];
		      
		      var possibleMoves = chessBoard.filterIllegalMoves(k, chessBoard.getPossibleMoves(k,position), "black", position, "-");

		      for (var m in possibleMoves) {
			   partialMoves.push([k,possibleMoves[m]]);
		      }

		      for (var m in partialMoves) {
			   moves.push(partialMoves[m]);
		      }
		  }
	     }
	 }
	 else if (turn === "black") {
	     for (var k in position) {
		  
		  if (position[k] === position[k].toLowerCase()) {
		      var partialMoves = [];
		      
		      var possibleMoves = chessBoard.filterIllegalMoves(k,chessBoard.getPossibleMoves(k,position), "white", position, "-");

		      for (var m in possibleMoves) {
			   partialMoves.push([k,possibleMoves[m]]);
		      }

		      for (var m in partialMoves) {
			   moves.push(partialMoves[m]);
		      }
		  }
	     }
	 }

	 return moves;
    
    },



    getHeuristic: function(position,turn) {
	 
	 var score = 0;
	 var result = chessBoard.getResult(position,turn,"-");
	 
	 if (result === "white")
	     return 1000;
	 else if (result === "black")
	     return -1000;
	 else if (result === "draw")
	     return 0;

	 var pieceValue = {"K":0, "Q":8.5, "R": 4.5, "B":3, "N":2.5, "P":1, "k":0, "q":-8.5, "r": -4.5, "b":-3, "n":-2.5, "p":-1 };  

	 for (var k in position) 
	     score += pieceValue[position[k]];

	 
	 return score;
   },

    
    getEvaluation: function(pos, turn) {
	 var other = turn === "black" ? "white" : "black";
	 
	 var depth = this.depth;

	 if (depth === 1) {
	     var possibleMoves = this.getPossibleMoves(pos, turn);
            possibleMoves.sort(function() {return 0.5 - Math.random()}) 
	    
	     var score;
	     
	     var opponent_pos, m, r, possibleResponses, finalPosition, bestMove=false;

	     for (var move in possibleMoves) {
                score = 0;
		  m = possibleMoves[move];
		  opponent_pos = chessBoard.generateNewPosition(m[0], m[1], "-", chessBoard.position);
                
		  possibleResponses = this.getPossibleMoves(opponent_pos, other);
                for (var response in possibleResponses) {
                    r = possibleResponses[response];
		      finalPosition = chessBoard.generateNewPosition(r[0], r[1], "-", opponent_pos);
                    
		      score += this.getHeuristic(finalPosition, turn); 
		      
		  }
		  score /= possibleResponses.length;

		  if (turn === "white") {
		      if (!bestMove || score > bestMove[1])
			   bestMove = [m,score];
                }
                else {
		      if (!bestMove || score < bestMove[1])
			   bestMove = [m,score];
                }
                
	     }
	     
	     console.log(score);
	     console.log(bestMove[0]);
	     return bestMove[0];
	 }

	 
	 

	 
    },


    
}


