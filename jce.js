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

    }
}