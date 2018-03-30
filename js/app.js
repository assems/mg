
//-----------------------------------------------------------------------
//	Shuffle function from http://stackoverflow.com/a/2450976
//-----------------------------------------------------------------------
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//-----------------------------------------------------------------------

//----------------------------
//	Declaring global variables
//---------------------------- 
let lista = 
		["fa-diamond", 
		"fa-paper-plane", 
		"fa-anchor", 
		"fa-bolt", 
		"fa-cube", 
		"fa-anchor", 
		"fa-leaf", 
		"fa-bicycle", 
		"fa-diamond", 
		"fa-bomb", 
		"fa-leaf", 
		"fa-bomb", 
		"fa-bolt", 
		"fa-bicycle", 
		"fa-paper-plane", 
		"fa-cube"],
	opened = [], 
	match, 
	moves, 
	executed = false, 
	deck = $('.deck'), 
	scorePanel = $('.score-panel'),
	moveNo = scorePanel.find('.moves'),	
	stars = scorePanel.find('i'), 
	restart = scorePanel.find('.restart');
	
//----------------------
//	Start Game function
//----------------------
function startGame(){
	deck.empty();
  	match = 0;
 	stars.removeClass('fa-star-o').addClass('fa fa-star');
 	moves = 0;
 	moveNo.html(moves + ' Moves');
	let sList = shuffle(lista);
	for (let i = 0; i < sList.length; i++) {
		deck.append('<li class="card"><i class="' + sList[i] + ' fa"></i></li>');
	}
	clearTimer();
}

//--------------------------
//	Starting timer on click
//--------------------------
deck.on('click', '.card', function(){
	if (executed===true){
		return; 
	};
	timer();
	executed = true;
});

//--------------------------
//	Flipping cards on click
//--------------------------
deck.on('click', '.card:not(".match, .open")', function() {
	if($('.show').length > 1) {
		return;
	}
	var	item = $(this),
		card = item.children('i').attr('class');
	opened.push(card);
 	item.addClass('open show');

 	//-------------------------
	//	Compare and match cards
	//-------------------------
	if (opened.length > 1) {
        if (card === opened[0]) {
	    	deck.find('.open').addClass('match animated tada');
		    setTimeout(function() {
		    	deck.find('.match').removeClass('open show animated tada');
		    }, 800);
	      match++;
	      opened = [];
	    } else {
	    	deck.find('.open').addClass('nomatch animated wobble');
			setTimeout(function() {
				deck.find('.open').removeClass('animated wobble open show nomatch');
			}, 530);
		  	opened = [];
		}
		moves++;
		rating(moves);
		moveNo.html(moves + ' Moves');
	}

	//------------------------------------
  	//	End Game if all cards were matched
  	//------------------------------------
	if (match === 8) {
		rating(moves);
		let score = rating(moves).noOfStars;
		clearTimeout(t);
		setTimeout(function() {
			endGame(moves, score);
		}, 500);
	}
});

//-----------------
//	Rating
//-----------------
function rating(moves) {
	let noOfStars = 3,
	thirdStar=document.querySelector('.third'),
	secondStar=document.querySelector('.second'),
	firstStar=document.querySelector('.first');
	if (moves > 18 && moves <= 26) {
		thirdStar.className="third fa fa-star-o";
		noOfStars = 2;
	} else if (moves > 26 && moves <= 35) {
		secondStar.className="second fa fa-star-o";
		noOfStars = 1;
	} else if (moves > 35) {
		firstStar.className="first fa fa-star-o";
		noOfStars = 0;
	}	
	return {noOfStars};
};

//-----------------------------------------------------------------------
//	popup function using Sweet Alert 2 from https://sweetalert2.github.io/
//-----------------------------------------------------------------------
//	End Game Function
//-------------------
function endGame(moves, noOfStars) {
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations! You Matched All Cards',
		text: ' Moves: ' + moves + ', Rating: ' + noOfStars + ' Stars, Time: ' + time.textContent,
		type: 'success',
		confirmButtonColor: '#9BCB3C',
		confirmButtonText: 'Play again!'
	}).then(function(isConfirm) {
		if (isConfirm) {
			startGame();
		}
	})
}

//-----------------------------------------
//	Restart Game on clicking restart button
//-----------------------------------------
restart.on('click', function() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9BCB3C',
    cancelButtonColor: '#EE0E51',
    confirmButtonText: 'Yes, Restart Game!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  })
});

//-------------------------------------------------------------------------------------
//	Timer function with some modifications from: https://jsfiddle.net/Daniel_Hug/pvk6p/
//-------------------------------------------------------------------------------------
let time = document.getElementsByTagName('h3')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();

}

function timer() {
    t = setTimeout(add, 1000);
    return ('time.textContent');
}


function clearTimer() {
	clearTimeout(t);
    time.textContent = "00:00";
    seconds = 0; minutes = 0; hours = 0;
    executed = false;
}
//-----------------------------------------------------------------


startGame();