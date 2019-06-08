import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss']
})
export class TaskSavePage implements OnInit {
  taskForm: FormGroup;
  pageTitle = '...';
  taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.pageTitle = 'Crear Tarea';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'Editar Tarea';
    this.tasksService
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Guardando....'
    });
    try {
      const task = !this.taskId
        ? await this.tasksService.create(this.taskForm.value)
        : await this.tasksService.update({
            id: this.taskId,
            ...this.taskForm.value
          });
      console.log('tarea : ', task);
      this.navCtrl.navigateBack('/tasks');
    } catch (error) {
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
