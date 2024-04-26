let menu = []; // メニューデータを格納する配列
let currentQuizIndex = 0; // 現在のクイズのインデックス

// メニューデータを読み込む関数
function loadMenu() {
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      menu = data.menu;
      startQuiz();
    })
    .catch(error => console.error('Error loading menu:', error));
}

// クイズを開始する関数
function startQuiz() {
  showNextMenu();
  document.getElementById('yesButton').addEventListener('click', showNextMenu);
  document.getElementById('submitButton').addEventListener('click', checkAnswers);
}

// 次の料理を表示する関数
function showNextMenu() {
  if (currentQuizIndex < menu.length) {
    let menuData = menu[currentQuizIndex];
    document.getElementById('menuDisplay').textContent = `料理名: ${menuData.name} (${menuData.term})`;
    currentQuizIndex++;
  } else {
    document.getElementById('menuDisplay').textContent = "全ての料理を表示しました。解答を始めてください。";
    document.getElementById('yesButton').style.display = "none";
    document.getElementById('answerSection').style.display = "block";
  }
}

// 解答をチェックする関数
function checkAnswers() {
  let correctCount = 0;
  let answers = document.getElementsByClassName('answer');
  for (let i = 0; i < answers.length; i++) {
    let userAnswer = answers[i].value.trim();
    let correctAnswer = menu[i].term;
    if (userAnswer === correctAnswer) {
      correctCount++;
    } else {
      alert(`誤りました。正解は ${menu[i].name} の呼称は「${correctAnswer}」です。`);
    }
  }
  let accuracy = (correctCount / menu.length) * 100;
  alert(`解答終了。正解率は ${accuracy}% です。`);
}

// ページの読み込みが完了したときに実行される処理
window.addEventListener('load', loadMenu);
