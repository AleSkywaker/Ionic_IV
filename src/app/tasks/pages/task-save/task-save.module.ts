import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

import { TaskSavePage } from './task-save.page';

const routes: Routes = [
  {
    path: '',
    component: TaskSavePage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [TaskSavePage]
})
export class TaskSavePageModule {}
