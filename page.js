// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import {loadQuiz} from 'public/quiz.js'

$w.onReady(function () {
  let titleField = $w('#qTitle')
  let descField = $w('#qDescription')
  let btnStart = $w('#qStartButton')

  let button1 = $w('#button1')
  let button2 = $w('#button2')
  let button3 = $w('#button3')
  let button4 = $w('#button4')

  loadQuiz("1", titleField, descField, btnStart, button1, button2, button3, button4).then((quiz) => {
    quiz.load();
  });

});