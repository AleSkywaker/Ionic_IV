import { OverlayService } from './../../../core/services/overlay.service';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class LogoutButtonComponent implements OnInit {
  @Input() menu: string;
  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {}

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: '¿Desea salir de la aplicación?',
      buttons: [
        {
          text: 'Si',
          handler: async () => {
            await this.authService.logout();
            this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }
}
