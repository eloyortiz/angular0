import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';
import { UsersComponent } from './components/users/users.component';

interface arrItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, UsersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  message = 'from app component';
  condition = true;
  options = ['uno', 'dos', 'tres'];
  selectedOption = 'tres';
  items: arrItem[] = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
  ];

  data: any;
  dataService$!: Subscription;

  constructor(private readonly dataService: DataService) {

    this.dataService$ = this.dataService.getData().subscribe({
      next: data => {
        this.data = data;
        console.log('AppComponent dice:', this.data);
      },
      error: error => {
        this.data = '';
        console.log('Error al recuperar los datos del BehaviorSubject', error);
      }
    });
  }
  ngOnDestroy(): void {
    this.dataService$.unsubscribe();
  }

  addData() {
    let newData = 'Hello from AppComponent';
    this.dataService.setData(newData);
  }

  trackByFn(index: number, item: arrItem): number {
    return item.id;
  }

  // trackByFn(index: any, item: { id: any }) {
  //   return item ? item.id : undefined;
  // }

  handleClick(): void {
    this.message = 'clicked at the app component from handleClick';
    this.dataService.setData(this.message);
  }

  changeCondition(): void {
    this.condition = !this.condition;
    this.handleClick();
  }
}
