var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var word = "javascript".toUpperCase();
var lettersLeft;
var guesses = [];
var guessesLeft = 8;
var guessesWrong = 0;
var loadingImg = true;

var baseImgLocation 

document.getElementsByTagName("body")[0].onload=initializeHangman;

function initializeHangman()
{
  document.getElementsByTagName("body")[0].onkeyup = keyClickEvent;
  document.getElementById("gallowImg").onload = imageLoaded;

  // Assign click handler for letter guesses
  var letters = document.getElementById("letters").getElementsByClassName("letter");
  for( var i = 0; i < letters.length; i++ )
  {
    var letter = letters[i];
    letter.onclick = mouseClickEvent;
  }

  // Display the word
  lettersLeft = word.length;
  var wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";
  for( var i = 0; i < word.length; i++ )
  {
    wordDiv.innerHTML += "<span class='letter'>_</span>";
  }
  
  // Preload all state game images to avoid delays during game play
  for( var i = 1; i <= guessesLeft; i++ )
  {
    preload(baseImgLocation + i + "_sm.png");
  }
}

// View
function updateImage(state)
{
  loadingImg = true;
  document.getElementsByTagName('body')[0].style.cursor  = 'wait';

  var gallowImg = document.getElementById("gallowImg");
  gallowImg.src = baseImgLocation + state + "_sm.png";
}

function imageLoaded(event)
{
  loadingImg = false;
  document.getElementsByTagName('body')[0].style.cursor = 'auto';
}

// Control
function keyClickEvent(event)
{
  choice(String.fromCharCode(event.keyCode))
}

function mouseClickEvent(event)
{
  choice(event.target.textContent);
}

function choice(letter)
{
  if( loadingImg )
  {
    console.log("Waiting for image to load, ignoring input.");
  }

  if( lettersLeft == 0 || guessesLeft == 0 )
  {
    console.log("Game over. Ignoring input.");
    return;
  }

  var letterPos = alphabet.indexOf(letter);
  if( letterPos < 0 )
  {
    console.log( letter + " is not a valid letter!");
    return;
  }

  if( guesses.indexOf(letter) > -1 )
  {
    console.log("You already guessed that!");
    return;
  }
  guesses.push(letter);

  var letters = document.getElementById("letters").getElementsByClassName("letter");

  if( word.indexOf(letter) > -1 ) // Correct guess
  {
    var wordLetters = document.getElementById("word").getElementsByClassName("letter");
    var foundLetterIndex = -1;
    while( (foundLetterIndex = word.indexOf(letter, foundLetterIndex+1)) > -1 )
    {
      lettersLeft--;
      wordLetters[foundLetterIndex].textContent = letter;
      wordLetters[foundLetterIndex].className = "letter correct";
      letters[letterPos].onclick = undefined;
      letters[letterPos].className = "letter correct";
    }
  }
  else // Incorrect guess
  {
    guessesWrong++;
    guessesLeft--;
    letters[letterPos].onclick = undefined;
    letters[letterPos].className = "letter wrong";
    updateImage(guessesWrong);
  }

  if( guessesLeft == 0 )
  {

    // Reveal remaining letters (in .wrong)
    var wordLetters = document.getElementById("word").getElementsByClassName("letter");
    for( var i = 0; i < wordLetters.length; i++ )
    {
      var wordTile = wordLetters[i];
      if( wordTile.textContent === "_" )
      {
        wordTile.textContent = word[i];
        wordTile.className = "letter wrong";
      }
    }
    alert("You Lose!");
  }

  if( lettersLeft == 0 )
  {
    alert("You Win!");
  }
}

function preload() 
{
  for (i = 0; i < preload.arguments.length; i++) 
  {
    images[i] = new Image();
    images[i].src = preload.arguments[i];
  }
 } 


