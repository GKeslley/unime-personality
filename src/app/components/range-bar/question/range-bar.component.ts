import { Component, Input, OnInit } from '@angular/core';
import questionsConclusion from '~/assets/json/questions-conclusion.json';

@Component({
  selector: 'app-range-bar',
  templateUrl: 'range-bar.component.html',
  styleUrls: ['range-bar.component.scss'],
  standalone: false,
})
export class RangeBarComponent implements OnInit {
  @Input() value: {sumTotal: number, totalQuestions: number} = {sumTotal: 0, totalQuestions: 0};
  @Input() factor: string = '';
  ranges = {
    low: {min: 1.00, max: 2.99, text: 'Baixo'},
    medium: {min: 3, max: 3.99, text: 'Médio'},
    high: {min: 4.00, max: 5.00, text: 'Alto'}
  }
  range: string = '0%';
  rangeText: string = '';
  conclusion: any = '';

  ngOnInit(): void {
    this.range = this.calculateRange();
    const conclusions: any = questionsConclusion;
    this.conclusion = conclusions[this.factor][this.rangeText] ?? '';
  }

  calculateRange(): string {
    const media = this.value.sumTotal / this.value.totalQuestions;
  
    const range = Object.values(this.ranges).find((range) => {
      return media >= range.min && media <= range.max;
    });
  
    if (!range) return '0%';
  
    this.rangeText = range.text;
  
    let faixaBase = 0; // percent offset
    let percent = 0;
  
    if (media < 3.0) {
      this.rangeText = 'Baixo';
      faixaBase = 0;
    } else if (media < 4.0) {
      this.rangeText = 'Médio';
      faixaBase = 33.4;
    } else {
      this.rangeText = 'Alto';
      faixaBase = 66.8;
    }
    percent = ((media - range.min) / (range.max - range.min)) * 33.4;
  
    const position = faixaBase + percent;
    return position.toFixed(2) + '%';
  }
}
