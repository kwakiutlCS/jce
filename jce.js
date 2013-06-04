var engine = {

    // gets all the possible moves in the board in a [["e2","e4"],["d2","d4"], ... ] format
    getPossibleMoves: function() {
	 var moves = [];

	 
	 if (chessBoard.turn === "white") {
	     for (var k in chessBoard.position) {
		  
		  if (chessBoard.position[k] === chessBoard.position[k].toUpperCase()) {
		      var partialMoves = [];
		      var possibleMoves = chessBoard.filterIllegalMoves(k, chessBoard.getPossibleMoves(k,chessBoard.position), "black");

		      for (var m in possibleMoves) {
			   partialMoves.push([k,possibleMoves[m]]);
		      }

		      for (var m in partialMoves) {
			   moves.push(partialMoves[m]);
		      }
		  }
	     }
	 }
	 else if (chessBoard.turn === "black") {
	     for (var k in chessBoard.position) {
		  
		  if (chessBoard.position[k] === chessBoard.position[k].toLowerCase()) {
		      var partialMoves = [];
		      var possibleMoves = chessBoard.filterIllegalMoves(k,chessBoard.getPossibleMoves(k,chessBoard.position), "white");

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



    getHeuristic: function(position) {
	 
	 var score = 0;
	 var result = chessBoard.getResult();
	 
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
}