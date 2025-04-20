import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from '~/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: 'timer.component.html',
  styleUrls: ['timer.component.scss'],
  standalone: false
})
export class TimerComponent implements OnInit, OnDestroy {
    timer: string = '00:00';
    private secondsElapsed = 0;
    private intervalId: any;

    constructor(private timerService: TimerService){}

    ngOnInit(): void {
        this.startTimer();
    }

    startTimer(): void {
        this.intervalId = setInterval(() => {
            this.secondsElapsed++;
            const timer = this.formatTime(this.secondsElapsed);
            this.timer = timer;
            this.timerService.updateTime(timer);
        }, 1000);
    }

    formatTime(totalSeconds: number): string {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
