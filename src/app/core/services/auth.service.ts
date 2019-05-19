import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User, AuthProvider } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  private signInWithEmail({ email, password }: User): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  private signUpWithEmail({ email, password, name }: User): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credentials => {
      return credentials.user
        .updateProfile({ displayName: name, photoURL: null })
        .then(() => credentials);
    });
  }

  private signInWithPopUp(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        signInProvider = new auth.GoogleAuthProvider();
        break;
    }
    return this.afAuth.auth.signInWithPopup(signInProvider);
  }
}
