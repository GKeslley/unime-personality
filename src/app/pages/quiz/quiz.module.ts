import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizPage } from './quiz.page';
import { QuizPageRoutingModule } from './quiz-routing.module';
import { QuestionComponent } from '~/app/components/question/question.component';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QuizPageRoutingModule,
    SharedModule
  ],
  declarations: [QuizPage, QuestionComponent]
})
export class QuizPageModule {}
