import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  data: any;
  dataService$!: Subscription;

  constructor(private readonly dataService: DataService) {
    this.dataService$ = this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
        console.log('UsersComponent dice:', this.data);
      },
      error: (error) => {
        this.data = '';
        console.log('Error al recuperar los datos del BehaviorSubject', error);
      },
    });
  }
  ngOnDestroy(): void {
    this.dataService$.unsubscribe();
  }

  addData() {
    let newData = 'Hello from UsersComponent';
    this.dataService.setData(newData);
  }
}
