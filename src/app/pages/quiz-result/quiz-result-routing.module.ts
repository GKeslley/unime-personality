import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizResultPage } from './quiz-result.page';

const routes: Routes = [
  {
    path: '',
    component: QuizResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizResultPageRoutingModule {}
