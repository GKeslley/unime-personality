import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/quiz/quiz.module').then(m => m.QuizPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/quiz-result/quiz-result.module').then(m => m.QuizResultPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
