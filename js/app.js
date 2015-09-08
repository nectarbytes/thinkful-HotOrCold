// Hot or Cold App: Challenge
// This game takes place entirely in the console.
// The user guesses a number 1 to 100 and gets clues
// as to getting warmer or colder as the user goes along.

var reset = function() {
	window.guess = undefined;
	window.actual = undefined;
	window.totalGuesses = 0;
	window.gameOver = false;
	window.guessList = [];
	window.degree = 101;
};

var gameOver = function(){
	gameOver = true;
}

var promptForGuess = function(){
	console.log("Please set guess to a whole number between 1 and 100. (e.g. Type \"guess = 34;\" into the console.");
}

// Check to make sure the guess is a whole number between 1 and 100.
var validGuess = function(){
	var passed = false;
	//console.log("The value of guess when it hits the validGuess func is: ", guess);
	var valid = parseInt(guess);
	//console.log("Valid is:", valid);
	if ( (isNaN(valid)) || 
		 (guess === undefined) ||
		 (valid < 1) ||
		 (valid > 100) 
		){
			passed = false;
	} else {
		passed = true;
	}
	return passed;
}

// Generate a random number between 1 and 100.
// Throws out zero and "rolls" again if zero is generated.
var generateRandomNumber = function(){
	actual = Math.ceil( (Math.random() * 100) );
	if (actual === 0){
		generateRandomNumber;
	}
	return actual;
}

var checkInitialTemperature = function(){
	//console.log("Guess in the checktemp is:", guess);
	//console.log("Actual in the checktemp is: ", actual);
	degree = Math.abs(actual - guess);
    if (guess === actual){
        console.log('You got it!');
        gameOver = true;        
    } else  if (degree >= 50){
        console.log('Ice cold... brrrrr.');
    } else if (degree >= 30){
    	console.log('Cold. ');
    } else if (degree >= 15){
    	console.log('Warm. ');
    } else if (degree >=5){
        console.log('Very HOT... ');
    } else if (degree > 0){
    	console.log("BOILING");
    }  
}

var warmerColder = function(){
	previousGuess = guessList.slice(guessList.length - 1);
	//console.log("Previous guess:", previousGuess);
	previousDegree = Math.abs(actual - previousGuess[previousGuess.length -1]);
	//console.log("Previous degree:", previousDegree);
	degree = Math.abs(actual - guess);
	//console.log("Degree:", degree);
	if (guess === actual){
        console.log('You got it!');
        gameOver = true;        
    } else if (previousDegree < degree){
		console.log("You're getting colder!");
	} else if (previousDegree > degree){
		console.log("You're getting warmer!");
	} else {
		console.log("You're the same distance away... which should be a clue!");
	}
}

var logGuess = function(){
	guessList.push(guess);
}

var giveFeedback = function(){
	console.log("You've made a total of", totalGuesses, "guesses.");
	console.log("Here are the numbers you've guessed so far:", guessList.join(", "));
}

function newGame(){
	reset();
	generateRandomNumber();
	return console.log("Okay, let's get ready to rumble!");
}

function submit(){
	if ( validGuess() ){
		if (totalGuesses < 1){
			checkInitialTemperature();
		}else {
			warmerColder();	
		}	
		logGuess();
		totalGuesses++;
		giveFeedback();			
	} else {
		promptForGuess();
	}
	if (gameOver) {
			console.log("To play again, type \"newGame();\".");
	}
	return gameOver ? "YOU WON!!!" : "Keep on guessin'....";
}

newGame();


