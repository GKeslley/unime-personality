import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FactorResult } from '../quiz/quiz.types';
import questionData from '~/assets/json/questions.json'
import { App } from '@capacitor/app';
import { CaptureShareService } from '~/app/services/capture-share.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-quiz-result',
  templateUrl: 'quiz-result.page.html',
  styleUrls: ['quiz-result.page.scss'],
  standalone: false,
})
export class QuizResultPage implements OnInit {
  @ViewChild('captureArea', { read: ElementRef }) captureArea!: ElementRef;
  result: FactorResult = {};
  currentDate: string = '';
  totalQuestions: number = 0;
  timeFinished: string = '00:00';
  backHandler: any;

  constructor(private router: Router, private captureShareService: CaptureShareService) {
    this.currentDate = (new Date()).toLocaleDateString('pt-BR');
    this.totalQuestions = questionData.length;
    const navigation = this.router.getCurrentNavigation()?.extras.state;
    if (navigation) {
      this.result = navigation['data'];
      this.timeFinished = navigation['time'];
    }
  }

  ngOnInit(): void {
    this.backHandler = App.addListener('backButton', () => {
      App.exitApp();
    });
  }

  async captureScreen() {
    await this.captureShareService.captureElementAndShare(this.captureArea.nativeElement, {
      fileName: 'quiz-screenshot.png'
    });
  }

  ngOnDestroy() {
    this.backHandler?.remove();
  }
}
