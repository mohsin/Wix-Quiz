// Filename: public/quiz.js
import {getQuiz, fetchQuiz, saveQuiz} from 'backend/quiz';

export class Quiz {

    constructor(quiz) {
        this.quiz = quiz;
    }

    static async create(quizId, titleField, descField, btnStart, btn1, btn2, btn3, btn4) {

        return await getQuiz(quizId).then((quiz) => {
            const quizObj = new this(quiz);
            quizObj.titleField = titleField;
            quizObj.descField = descField;
            quizObj.btnStart = btnStart;
            quizObj.titleField.text = quiz.name;
            quizObj.descField.text = quiz.description;
            quizObj.btn1 = btn1;
            quizObj.btn2 = btn2;
            quizObj.btn3 = btn3;
            quizObj.btn4 = btn4;
            return quizObj;
        })
        .catch(error => {
            console.log(error);
        });
    }

    load() {
        this.currentQn = 0;
        this.titleField.show();
        this.descField.show();
        this.btnStart.show();
        this.btnStart.label = "Loading...";
        this.btnStart.onClick(() => {
            throw Error("Quiz not loaded yet!")
        })
        fetchQuiz(this.quiz._id).then((result) => {
            this.questions = result.items;
            this.btnStart.label = "Start Quiz";
            this.btnStart.onClick(() => {
                this.btnStart.hide();
                this.btn1.show();
                this.btn2.show();
                this.btn3.show();
                this.btn4.show();
                this.answerMatrix = [];
                this.iterateQuestion("");

                this.btn1.onClick(() => {
                    this.iterateQuestion(this.btn1.label);
                })
                this.btn2.onClick(() => {
                    this.iterateQuestion(this.btn2.label);
                })
                this.btn3.onClick(() => {
                    this.iterateQuestion(this.btn3.label);
                })
                this.btn4.onClick(() => {
                    this.iterateQuestion(this.btn4.label);
                })
            })
        });
    }

    iterateQuestion(answer) {
        // Process answer
        if(answer.length > 0) {
            if(this.currentQuestion.answer === answer) {
                this.answerMatrix.push(true)
            } else {
                this.answerMatrix.push(false)
            }
        }

        // Bring forward next question
        if(!this.isLastQuestion) {
            this.currentQuestion = this.nextQuestion;
            let options = [
                this.currentQuestion.option1,
                this.currentQuestion.option2,
                this.currentQuestion.option3,
                this.currentQuestion.answer
            ];
            this.shuffleArray(options);

            this.titleField.text = "Question " + this.currentQn;
            this.descField.text = this.currentQuestion.question;
            this.btn1.label = options.shift();
            this.btn2.label = options.shift();
            this.btn3.label = options.shift();
            this.btn4.label = options.shift();
        } else {
            this.titleField.text = "End of quiz!";
            this.btn1.hide();
            this.btn2.hide();
            this.btn3.hide();
            this.btn4.hide();
            saveQuiz(this.quiz, "1", this.answerMatrix)
            this.descField.text = "Your score of ("
                    + this.answerMatrix.filter(v => v === true).length
                    + "/" + this.questions.length
                    + ") has been sent to your teacher";
        }
    }

    get isLastQuestion() {
        return this.currentQn === this.questions.length;
    }

    get nextQuestion() {
        let qn = this.questions[this.currentQn];
        this.currentQn++;
        return qn;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

export async function loadQuiz(id, titleField, descField, btnStart, btn1, btn2, btn3, btn4) {
    titleField.hide();
    descField.hide();
    btnStart.hide();
    btn1.hide();
    btn2.hide();
    btn3.hide();
    btn4.hide();
    return Quiz.create(id, titleField, descField, btnStart, btn1, btn2, btn3, btn4);
}