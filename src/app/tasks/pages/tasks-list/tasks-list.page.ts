import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss']
})
export class TasksListPage implements OnInit {
  tasks$: Observable<Task[]>;
  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private taskService: TasksService
  ) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getAll();
  }

  onUpdate(task: Task): void {
    // console.log('evento ', task.title);
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`);
    // this.navCtrl.navigateForward(['tasks', 'edit', task.id]);
  }
  async onDelete(task: Task): Promise<void> {
    await this.overlayService.alert({
      message: `¿Desea eliminar la tarea? ${task.title}?`,
      buttons: [
        {
          text: 'Si',
          handler: async () => {
            await this.taskService.delete(task);
            await this.overlayService.toast({
              message: `Tarea ${task.title} eliminada!`
            });
          }
        },
        'No'
      ]
    });
  }
}
