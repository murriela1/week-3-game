<SCRIPT LANGUAGE="JavaScript"><!--
gallows = new Array("--------\n|      |\n|\n|\n|\n|\n=====",
"--------\n|      O\n|\n|\n|\n|\n=====",
"--------\n|      O\n|      |\n|\n|\n|\n=====",
"--------\n|      O\n|     \\|\n|\n|\n|\n=====",
"--------\n|      O\n|     \\|/\n|\n|\n|\n=====",
"--------\n|      O\n|     \\|/\n|      |\n|\n|\n=====",
"--------\n|      O\n|     \\|/\n|      |\n|     /\n|\n=====",
"--------\n|      O\n|     \\|/\n|      |\n|     / \\\n|\n=====")
guessChoices = new
Array("Mutiny","Pirate","Ship","Revenge")
function startAgain() {
 guesses = 0
 max = gallows.length-1
 guessed = " "
 len = guessChoices.length - 1
 toGuess = guessChoices[Math.round(len*Math.random())].toUpperCase()
 displayHangman()
 displayToGuess()
 displayGuessed()
}
function stayAway() {
 document.game.elements[3].focus()
 alert("ARGH MATEY! YAR BE TRYIN' AGAIN")
}
function displayHangman() {
 document.game.status.value=gallows[guesses]
}
function displayToGuess() {
 pattern=""
 for(i=0;i<toGuess.length;++i) {
  if(guessed.indexOf(toGuess.charAt(i)) != -1)
   pattern += (toGuess.charAt(i)+" ")
  else pattern += "_ "
 }
 document.game.toGuess.value=pattern
}
function displayGuessed() {
 document.game.guessed.value=guessed
}
function badGuess(s) {
 if(toGuess.indexOf(s) == -1) return true
 return false
}
function winner() {
 for(i=0;i<toGuess.length;++i) {
  if(guessed.indexOf(toGuess.charAt(i)) == -1) return false
 }
 return true
}
function guess(s){
 if(guessed.indexOf(s) == -1) guessed = s + guessed
 if(badGuess(s)) ++guesses
 displayHangman()
 displayToGuess()
 displayGuessed()
 if(guesses >= max){
 alert("SHIVER ME TIMBERS! WALK THE PLANK, MATEY! Word Wrong = "+toGuess+".")
  startAgain()
 }
 if(winner()) {
  alert("YO HO HO! A PIRATE'S LIFE BE FOR YOU!")
  startAgain()
 }
}
// --></SCRIPT>
