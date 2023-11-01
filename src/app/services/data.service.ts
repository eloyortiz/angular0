import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  miBehaviorSubject = new BehaviorSubject<string>('Hello World!');

  constructor() { }

  setData(data: string) {
    this.miBehaviorSubject.next(data);
  }

  getData(): Observable<string> {
    return this.miBehaviorSubject.asObservable();
  }


}
