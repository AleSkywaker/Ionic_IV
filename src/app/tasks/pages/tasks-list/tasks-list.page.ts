import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss']
})
export class TasksListPage implements OnInit {
  tasks$: Observable<Task[]>;
  constructor(private navCtrl: NavController, private taskService: TasksService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getAll();
  }

  onUpdate(task: Task): void {
    console.log('evento ', task.title);
  }
}
