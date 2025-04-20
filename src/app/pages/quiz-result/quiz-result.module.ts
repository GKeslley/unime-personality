import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizResultPage } from './quiz-result.page';
import { QuizResultPageRoutingModule } from './quiz-result-routing.module';
import { RangeBarComponent } from '~/app/components/range-bar/question/range-bar.component';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QuizResultPageRoutingModule,
    SharedModule
  ],
  declarations: [QuizResultPage, RangeBarComponent]
})
export class QuizResultPageModule {}
