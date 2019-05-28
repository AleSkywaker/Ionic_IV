import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {}

  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  private setItem(item: T, operation: string): Promise<T> {
    this.collection // /users/someID/tasks/anotherID
      .doc<T>(item.id);
    return Promise.resolve(null);
  }

  public getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }
}
