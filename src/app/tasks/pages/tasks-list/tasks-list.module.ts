import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksListPage } from './tasks-list.page';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TasksListPage
  }
];

@NgModule({
  imports: [ComponentsModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}
