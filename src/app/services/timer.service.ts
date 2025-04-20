import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimerService {
  private timeSubject = new BehaviorSubject<string>('00:00');
  time$ = this.timeSubject.asObservable();

  updateTime(newTime: string) {
    this.timeSubject.next(newTime);
  }
}