import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button>
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class LogoutButtonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
