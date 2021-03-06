var imgDiv;
var lblDashes;
var txtBox;
var okBut;
var usedChars;
var msg;
var inLetter;
var inWord;
var inWordArr = [];
var correctCnt = 0;
var errCnt = 0;
var resetBut;
var lose = false;
var players;
var playerName;
var nameSet;
var lettersUsed = [];

function init(){
	

	
	imgDiv = document.getElementById('myImg');
	lblDashes = document.getElementById('dashes'); 
	txtBox = document.getElementById('txtBox');
	okBut = document.getElementById('okBut');
	resetBut = document.getElementById('reset');
	usedChars = document.getElementById('used');
	nameSet = document.getElementById('headerTxt');
	msg = document.getElementById('msg');	
	var url = window.location.href;
	players = url.match(/player=(\w+)/i)[1];
	playerName = url.match(/name=(\w+)/i)[1];	
	if(players === '1')
		randomWord();
	if(players === '2'){
		var inWordTemp = url.match(/word=(\w+)/i)[1];
		inWord = window.atob(inWordTemp);
		inWord = inWord.toUpperCase();		
		setDash();
	}
	nameSet.innerHTML += playerName;
	okBut.onclick = setLetter;
	resetBut.onclick = reset;	
    document.onkeydown = function(){
		if(window.event.keyCode=='13'){
			if(lose == false)
			   setLetter();
		}
	}
    setFocus();
	
}//ends init	

function setFocus(){
	$(function() {
		$(txtBox).focus();
	  });	  
}//ends setFocus

function setDash(){
	lblDashes.innerHTML = '';
	for( var x = 0; x < inWord.length; x++){
		inWordArr.push('_');	
		lblDashes.innerHTML += inWordArr[x];
		lblDashes.innerHTML += ' ';
	}
	if (correctCnt == inWord.length){	   
	   setMsg('You WIN!!!!!');
	   resetBut.style.visibility = 'visible';	   
	   alert('You WIN!!!!! The word was '+inWord);
	   okBut.disabled = true;
	}   
	setFocus();
}//ends setDash

function setLetter(){
  var flag = false;
  setError(' ');
  inLetter = txtBox.value;
  inLetter = inLetter.toUpperCase();
  
  if (inLetter === '')
	alert('No Blanks Please');
  else if (!/^[a-zA-Z]*$/g.test(inLetter)) 
	alert('Only Letters Please.')
  else
	if(lettersUsed.indexOf(inLetter) === -1){
		lettersUsed.push(inLetter);		
		for( var x = 0; x < inWordArr.length; x++)
			if (inLetter == inWord.charAt(x)){
				inWordArr[x] = inLetter;	      
				flag = true;
				correctCnt++;
			}//ends if
		if (flag == false)       
			setIncorrect();     	  
	}//ends top if
  txtBox.value = '';
  setDash();	
  setFocus();
}//ends setLetter

function setIncorrect(){
	errCnt++;
	setError('Wrong guess. '+(7 - errCnt)+' trie(s) left.');
    usedChars.innerHTML += inLetter+' ';
    if (errCnt < 7)
        imgDiv.src = 'assets/images/hangman'+errCnt+'.jpg';
    if (errCnt > 6){
        imgDiv.src = 'assets/images/original.jpg';
        setError('YOU LOSE!. Word was '+inWord);
		resetBut.style.visibility = 'visible';
		okBut.disabled = true;
		lose = true;
		alert("Sorry you lose!");
	}
	setFocus();
}//ends setError

function reset(){
	
	window.location.href = "index.html"

}//ends reset
 
function randomWord() {
		 
	 var requestStr = "https://api.wordnik.com/v4/words.json/randomWord?" +
		 "&minLength=5&maxLength=-1" +
		 "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
	  $.ajax({
				type: "GET",
				url: requestStr,
				dataType: "json",
				success : function(data){
					 randomWordComplete(JSON.stringify(data.word));
									 },					 
	 });
}//ends randomWord

function randomWordComplete(data) {	 
	var tempWord = data.replace(/['"]+/g, '');
	inWord = tempWord.toUpperCase();
	setDash();	
 }

function setMsg(msgIn){
	msg.style.color = "#00ff00";//Green
	msg.innerHTML = msgIn;
}//ends setMsg

function setError(errMsg){	
	msg.style.color = "#ff0000";//Red	
	msg.innerHTML = errMsg;	
}//ends setError

document.addEventListener( "DOMContentLoaded" , init , false ) ;
