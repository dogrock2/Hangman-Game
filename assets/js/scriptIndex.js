var wordTxt;
var butStart;
var inName;
var radio1;
var radio2;
var inputWord;

function init() {
    wordTxt = document.getElementById('inputWord');
    radio1 = document.getElementById('radio1');
    radio2 = document.getElementById('radio2');
    inName = document.getElementById('inputName');
    butStart = document.getElementById('startButton');
    butStart.onclick = startGame;
    disableBox();
    radio1.onclick = disableBox;
    radio2.onclick = enableBox;
}
function startGame() {
    if (radio1.checked)
        if (inName.value == '')
            alert('Please enter a name');
        else
            window.location.href = "hangman.html?player=1&name=" + inName.value + "";

    if (radio2.checked)
        if ((inName.value == '') || (wordTxt.value == ''))
            alert('Please enter a name and a secret word');
        else {
            var encodedData = window.btoa(wordTxt.value);
            window.location.href = "hangman.html?player=2&name=" + inName.value + "&word=" + encodedData + "";
        }
}
function enableBox() {
    $(wordTxt).attr('disabled', false);
}
function disableBox() {
    $(wordTxt).attr('disabled', true);
}
document.addEventListener("DOMContentLoaded", init, false);
