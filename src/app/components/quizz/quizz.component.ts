import {Component, OnInit} from '@angular/core';
import data_questions from "../../../assets/data/quizz_questions.json";
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = "";

  questions: any;
  questionSelected: any;
  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  answers: string[] = [];
  answerResult: string = "";

  result: boolean = false;
  finished: boolean = false;

  ngOnInit(): void {
    if (data_questions) {
      this.finished = false;
      this.title = data_questions.title;
      this.questions = data_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(value: string) {
    this.answers.push(value);
    this.questionIndex++;

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected= this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.result = true;
      this.checkResult();
    }
    console.log(this.answers);
  }

  async checkResult() {
    const result = this.answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    });

    // keyof typeof = forçar o tipo correto
    this.answerResult = data_questions.results[result as keyof typeof data_questions.results];
  }
}
