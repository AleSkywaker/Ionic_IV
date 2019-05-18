import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  private sigInWithEmail({ email, password }): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  private sigUpWithEmail({ email, password, name }): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credentials => {
      return credentials.user
        .updateProfile({ displayName: name, photoURL: null })
        .then(() => credentials);
    });
  }
}
