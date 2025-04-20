import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option, Question } from './question.type';
import { IonRadio, IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.scss'],
  standalone: false
})
export class QuestionComponent implements OnInit {
  @Input() data: Question|null = null;
  @Input() checkedValue: number|undefined = undefined;
  @Output() onOptionChangedEvent: EventEmitter<Question> = new EventEmitter<Question>();
  options: Option[] = [
    {text: 'Discordo totalmente', likert: 1},
    {text: 'Discordo', likert: 2},
    {text: 'Não discordo nem concordo', likert: 3},
    {text: 'Concordo', likert: 4},
    {text: 'Concordo totalmente', likert: 5}
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

  handleChange(event: Event, question: Question|null): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (question) {
      question.likert = value;
      this.onOptionChangedEvent.emit(question);
    }
  }

}
