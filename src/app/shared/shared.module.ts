import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from '../components/timer/timer.component';

@NgModule({
  declarations: [HeaderComponent, TimerComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [HeaderComponent, TimerComponent]
})
export class SharedModule { }
