import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';

@NgModule({
  declarations: [LogoutButtonComponent, MenuToggleComponent],
  imports: [IonicModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LogoutButtonComponent,
    MenuToggleComponent
  ]
})
export class SharedModule {}
