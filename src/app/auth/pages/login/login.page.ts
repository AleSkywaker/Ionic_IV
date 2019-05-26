import { OverlayService } from './../../../core/services/overlay.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { AuthProvider } from '../../../core/services/auth.types';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  authProvider = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }
  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }
  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading({ message: 'Cargando.........' });
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('usuario autenticato', credentials);
      console.log('Redirecting.......');
    } catch (e) {
      console.log('Auth error: ', e);
      await this.overlayService.toast({ message: e.message });
    } finally {
      loading.dismiss();
    }
  }
}
