import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss']
})
export class TasksListPage implements OnInit {
  tasks$: Observable<Task[]>;
  user: firebase.User;
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private taskService: TasksService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.authState$.subscribe(user => {
      this.user = user;
    });
    const loading = await this.overlayService.loading({ message: 'cargando...' });
    this.tasks$ = this.taskService.getAll();
    this.tasks$.pipe(take(1)).subscribe(task => loading.dismiss());
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

  async onDone(task: Task): Promise<void> {
    const taskToUpdate = { ...task, done: !task.done };
    await this.taskService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Tarea ${task.title} ${taskToUpdate.done ? 'Completada' : 'Actualizada'}! `
    });
  }
}
