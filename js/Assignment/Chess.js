var NUMBER_OF_COLS = 8,
	NUMBER_OF_ROWS = 8,
	BLOCK_SIZE = 100;

var BLOCK_COLOUR_1 = '#9f7119',
	BLOCK_COLOUR_2 = '#debf83',
	HIGHLIGHT_COLOUR = '#fb0006';

var piecePositions = null;

var PIECE_PAWN = 0,
	PIECE_CASTLE = 1,
	PIECE_ROUKE = 2,
	PIECE_BISHOP = 3,
	PIECE_QUEEN = 4,
	PIECE_KING = 5,
	IN_PLAY = 0,
	TAKEN = 1,
	pieces = null,
	ctx = null,
	json = null,
	canvas = null,
	BLACK_TEAM = 0,
	WHITE_TEAM = 1,
	SELECT_LINE_WIDTH = 5,
	currentTurn = WHITE_TEAM,
	selectedPiece = null;
function getBlockColour(iRowCounter, iBlockCounter)
{
    var cStartColour;
     
    // Alternate the block colour
    if(iRowCounter % 2)
        cStartColour = (iBlockCounter % 2?BLOCK_COLOUR_1:BLOCK_COLOUR_2);
    else
        cStartColour = (iBlockCounter % 2?BLOCK_COLOUR_2:BLOCK_COLOUR_1);
         
    return cStartColour;
}
function drawBlock(iRowCounter, iBlockCounter)
{   
    // Set the background
    ctx.fillStyle = getBlockColour(iRowCounter, iBlockCounter);
     
    // Draw rectangle for the background
    ctx.fillRect(iRowCounter * BLOCK_SIZE, iBlockCounter * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
 
    ctx.stroke();   
}
function drawRow(iRowCounter)
{
    // Draw 8 block left to right
    for(iBlockCounter = 0; iBlockCounter < NUMBER_OF_ROWS; iBlockCounter++)
    {
        drawBlock(iRowCounter, iBlockCounter);
    }
}
function getImageCoords(pieceCode, bBlackTeam) {

	var imageCoords =  {
		"x": pieceCode * BLOCK_SIZE,
		"y": (bBlackTeam ? 0 : BLOCK_SIZE)
	};

	return imageCoords;
}
function drawBoard()
{   
    for(iRowCounter = 0; iRowCounter < NUMBER_OF_ROWS; iRowCounter++)
    {
        drawRow(iRowCounter);
    }   
     
    // Draw outline
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, NUMBER_OF_ROWS * BLOCK_SIZE, NUMBER_OF_COLS * BLOCK_SIZE); 
}
function drawPiece(curPiece, bBlackTeam) {

	var imageCoords = getImageCoords(curPiece.piece, bBlackTeam);

	// Draw the piece onto the canvas
	ctx.drawImage(pieces,
		imageCoords.x, imageCoords.y,
		BLOCK_SIZE, BLOCK_SIZE,
		curPiece.col * BLOCK_SIZE, curPiece.row * BLOCK_SIZE,
		BLOCK_SIZE, BLOCK_SIZE);
}
function drawTeamOfPieces(teamOfPieces, bBlackTeam) {
	var iPieceCounter;

	// Loop through each piece and draw it on the canvas	
	for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) {
		drawPiece(teamOfPieces[iPieceCounter], bBlackTeam);
	}
}

function drawPieces() {
	drawTeamOfPieces(json.black, true);
	drawTeamOfPieces(json.white, false);
}
function defaultPositions()
{
    json = 
    {
        "white": 
        [
            {
                "piece": PIECE_CASTLE,
                "row": 0,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_ROUKE,
                "row": 0,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BISHOP,
                "row": 0,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_KING,
                "row": 0,
                "col": 3,
                "status": IN_PLAY
            },  
            {
                "piece": PIECE_QUEEN,
                "row": 0,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BISHOP,
                "row": 0,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_ROUKE,
                "row": 0,
                "col": 6,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_CASTLE,
                "row": 0,
                "col": 7,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 3,
                "status": IN_PLAY
            },  
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 6,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 1,
                "col": 7,
                "status": IN_PLAY
            }
        ],
        "black": 
        [
            {
                "piece": PIECE_CASTLE,
                "row": 7,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_ROUKE,
                "row": 7,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BISHOP,
                "row": 7,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_KING,
                "row": 7,
                "col": 3,
                "status": IN_PLAY
            },  
            {
                "piece": PIECE_QUEEN,
                "row": 7,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BISHOP,
                "row": 7,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_ROUKE,
                "row": 7,
                "col": 6,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_CASTLE,
                "row": 7,
                "col": 7,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 3,
                "status": IN_PLAY
            },  
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 6,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_PAWN,
                "row": 6,
                "col": 7,
                "status": IN_PLAY
            }
        ]       
    };
}
function draw()
{   // Main entry point got the HTML5 chess board example
    canvas = document.getElementById('board');
    // Canvas supported?
    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');
        // Calculdate the precise block size
        BLOCK_SIZE = canvas.height / NUMBER_OF_ROWS; 
        // Draw the background
        drawBoard();
        defaultPositions();
        // Draw pieces
        pieces = new Image();
        pieces.src = 'https://geeksretreat.files.wordpress.com/2012/06/pieces.png';
        pieces.onload = drawPieces;
        //canvas.addEventListener('click', board_click, false);
    }
    else
    {
        alert("Canvas not supported!");
    }
}



   
  