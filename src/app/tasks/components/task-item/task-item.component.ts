import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  // <app-task-item [task]="task"></app-task-item>
  @Input() task: Task;
  @Output() done = new EventEmitter<Task>();
}
