// Filename: public/quiz.js
//
// Code written in public files is shared by your site's
// Backend, page code, and site code environments.
//
// Use public files to hold utility functions that can
// be called from multiple locations in your site's code.

import {getQuiz, fetchQuiz} from 'backend/quiz';

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
        this.btnStart.onClick(() => {
            throw Error("Quiz not loaded yet!")
        })
        fetchQuiz(this.quiz._id).then((result) => {
            this.questions = result.items;
            this.btnStart.onClick(() => {
                this.btnStart.hide();
                this.btn1.show();
                this.btn2.show();
                this.btn3.show();
                this.btn4.show();
                this.iterateQuestion();

                this.btn1.onClick(() => {
                    this.iterateQuestion();
                })
                this.btn2.onClick(() => {
                    this.iterateQuestion();
                })
                this.btn3.onClick(() => {
                    this.iterateQuestion();
                })
                this.btn4.onClick(() => {
                    this.iterateQuestion();
                })
            })
        });
    }

    iterateQuestion() {
        if(!this.isLastQuestion) {
            let currentQuestion = this.nextQuestion;
            let options = [
                currentQuestion.option1,
                currentQuestion.option2,
                currentQuestion.option3,
                currentQuestion.answer
            ];
            this.shuffleArray(options);

            this.titleField.text = "Question " + this.currentQn;
            this.descField.text = currentQuestion.question;
            this.btn1.label = options.shift();
            this.btn2.label = options.shift();
            this.btn3.label = options.shift();
            this.btn4.label = options.shift();
        } else {
            this.titleField.text = "End of quiz!";
            this.descField.text = "Your score has been sent to your teacher";
            this.btn1.hide();
            this.btn2.hide();
            this.btn3.hide();
            this.btn4.hide();
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

    // Credit: https://stackoverflow.com/a/12646864/997147
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