'use strict';

// Todo: too messy. Get CR
// Todo: fix small cells when all col table nums < 10

var gCurrNum = 1;
var gStartTime;
var gTimerInterval;
var seconds;
var milliseconds;

function init() {
  renderNumbers(getDifficultyCellsNums());
}

function renderNumbers(difficulty) {
  var strHTML = '<tr>';
  var rowNum = Math.sqrt(getDifficultyCellsNums());
  var elTbody = document.querySelector('tbody');
  var numbers = [];

  for (var i = 1; i <= difficulty; i++) {
    numbers.push(i);
  }
  shuffleNums(numbers);
  // debugger;
  for (var j = 1; j - 1 < difficulty; j++) {
    var currNum = numbers.pop();
    strHTML += `<td data-id="${currNum}" onclick=cellClicked(this)>${currNum}</td>`;

    if (j % rowNum === 0) strHTML += '</tr>';
  }
  elTbody.innerHTML += strHTML;
}

function cellClicked(elTd) {
  var numClicked = parseInt(elTd.dataset.id);
  var elNextNum = document.querySelector('.next-number');

  if (numClicked === 1) {
    gStartTime = new Date().getTime();
    gTimerInterval = setInterval(showGameTime, 1);
  }

  if (numClicked === gCurrNum) {
    elTd.classList.add('correct-num');
    gCurrNum++;
    elNextNum.innerText = 'Next Number: ' + gCurrNum;
    if (gCurrNum > getDifficultyCellsNums()) {
      clearInterval(gTimerInterval);
      showWinMsg();
      gCurrNum = 1;
    }
  }
}

function buildNums() {
  var nums = [];
  for (var i = 1; i - 1 < getDifficultyCellsNums(); i++) {
    nums.push(i);
  }
  return nums;
}

function shuffleNums(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getDifficulty() {
  var radioBtns = document.querySelectorAll('.difficulty');
  for (var i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      var checkedBtn = radioBtns[i];
      var difficulty = checkedBtn.value;
      return difficulty;
    }
  }
}

function getDifficultyCellsNums() {
  var diff = getDifficulty();
  var diffCellNums = diff === 'easy' ? '16' : diff === 'hard' ? '25' : '36';
  return diffCellNums;
}

function showWinMsg() {
  var elNextNum = document.querySelector('.next-number');
  elNextNum.innerText = 'You Won!';
}

function newGame() {
  clearInterval(gTimerInterval);
  var elems = Array.from(document.querySelectorAll('.correct-num'));

  for (var i = 0; i < elems.length; i++) {
    elems[i].classList.remove('correct-num');
  }
  // reset next number to 1
  var elNextNum = document.querySelector('.next-number');
  elNextNum.innerText = 'Next Number: ' + gCurrNum;
  // empty table
  var elTbody = document.querySelector('tbody');
  elTbody.innerHTML = '';
  // build new table
  renderNumbers(getDifficultyCellsNums());
  gCurrNum = 1;
  var elGameTime = document.querySelector('.game-time');
  elGameTime.innerText = '';
  milliseconds = 0;
  seconds = 0;
}

function showGameTime() {
  var currTime = Date.now();
  var timePassed = new Date(currTime - gStartTime);
  seconds = timePassed.getSeconds();
  milliseconds = timePassed.getMilliseconds();
  var gameTime = seconds + '.' + milliseconds;
  var elGameTime = document.querySelector('.game-time');
  elGameTime.innerText = gameTime;
}
