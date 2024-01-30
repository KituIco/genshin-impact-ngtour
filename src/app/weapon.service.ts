import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cons, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Weapon } from './weapon';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  private weaponsUrl = 'https://genshin.jmp.blue/weapons';  // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET Weapons from the server */
  getWeapons(): Observable<Weapon[]> {
    const url = `${this.weaponsUrl}/all`;
    return this.http.get<Weapon[]>(url)
      .pipe(
        catchError(this.handleError<Weapon[]>('getWeapons', []))
      );
  }

  /** GET Weapon by id. Return `undefined` when id not found */
  getWeaponNo404<Data>(id: string): Observable<Weapon> {
    const url = `${this.weaponsUrl}/?id=${id}`;
    return this.http.get<Weapon[]>(url)
      .pipe(
        map(weapons => weapons[0]), // returns a {0|1} element array
        catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
      );
  }

  /** GET weapoin by id. Will 404 if id not found */
  getWeapon(id: string): Observable<Weapon> {
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.get<Weapon>(url).pipe(
      catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
    );
  }

}
