import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '~/app/components/question/question.type';
import questionsData from '~/assets/json/questions.json';
import { FactorResult } from './quiz.types';
import { TimerService } from '~/app/services/timer.service';

@Component({
  selector: 'app-quiz',
  templateUrl: 'quiz.page.html',
  styleUrls: ['quiz.page.scss'],
  standalone: false,
})
export class QuizPage implements OnInit {
  currentQuestions: Question[] = [];
  maxDisplayQuestions: Array<number> = [9, 8, 8, 8];
  currentView: number = 0;
  start = 0;
  checkedQuestions: { [key: number]: Question; } = {};
  currentTime: string = '';

  constructor(private router: Router, private timerService: TimerService) {}

  ngOnInit(): void {
    this.buildQuestions();
    this.timerService.time$.subscribe((currentTime: string) => {
      this.currentTime = currentTime;
    });
  }

  onOptionChangedEvent(question: Question) {
    this.checkedQuestions[question.id] = question;
    console.log(this.checkedQuestions);
    
  }

  next() {
    if (this.currentView === this.maxDisplayQuestions.length - 1) {
      this.router.navigate(['result'], {
        state: {
          data: this.getResult(),
          time: this.currentTime
        }
      });
      return;
    }
    this.currentView++;
    this.start += this.maxDisplayQuestions[this.currentView - 1] ?? 0;
    this.buildQuestions();
  }

  back() {
    this.currentView--;
    this.start = this.start - this.maxDisplayQuestions[this.currentView];
    this.buildQuestions();
  }

  private buildQuestions() {
    const end = this.maxDisplayQuestions[this.currentView] + this.start;
    this.currentQuestions = questionsData.slice(this.start, end).map((question: Question) => {
      return {
        id: question.id,
        factor: question.factor,
        text: question.text,
        reversed: question.reversed
      };
    });
  }

  private getResult() {
    return Object.values(this.checkedQuestions).reduce((acc: FactorResult, current: Question) => {
      const likert = current.likert ?? 0;
      if (!acc[current.factor]) {
        acc[current.factor] = {sumTotal: 0, totalQuestions: 0};
      }
      acc[current.factor].sumTotal += current.reversed ? 6 - likert : likert;
      acc[current.factor].totalQuestions += 1;
      return acc;
    }, {});
  }
}
