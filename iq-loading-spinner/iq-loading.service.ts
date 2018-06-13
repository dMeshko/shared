import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class IqLoadingService {
  private loaderSubject = new Subject<ILoadingState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<ILoadingState>{show: true});
  }

  hide() {
    this.loaderSubject.next(<ILoadingState>{show: false});
  }
}

export interface ILoadingState{
  show: boolean;
}
