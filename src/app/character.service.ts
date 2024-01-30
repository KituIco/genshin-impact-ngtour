import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cons, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Character } from './character';
import { Constellation } from './constellation';
import { Talent } from './talent';

@Injectable({ providedIn: 'root' })
export class CharacterService {

  private charactersUrl = 'https://genshin.jmp.blue/characters';  // URL to web api

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

  /** GET Characters from the server */
  getCharacters(): Observable<Character[]> {
    const url = `${this.charactersUrl}/all`;
    return this.http.get<Character[]>(url)
      .pipe(
        catchError(this.handleError<Character[]>('getCharacters', []))
      );
  }

  /** GET Character by id. Return `undefined` when id not found */
  getCharacterNo404<Data>(id: string): Observable<Character> {
    const url = `${this.charactersUrl}/?id=${id}`;
    return this.http.get<Character[]>(url)
      .pipe(
        map(characters => characters[0]), // returns a {0|1} element array
        catchError(this.handleError<Character>(`getCharacter id=${id}`))
      );
  }

  /** GET Character by id. Will 404 if id not found */
  getCharacter(id: string): Observable<Character> {
    const url = `${this.charactersUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  getConstellations(id: string): Observable<Constellation[]> {
    const url = `${this.charactersUrl}/${id}/constellations`;
    return this.http.get<Constellation[]>(url).pipe(
      catchError(this.handleError<Constellation[]>(`getConstellations id=${id}`))
    );
  }

  getTalents(id: string): Observable<Talent[]> {
    const url = `${this.charactersUrl}/${id}/talents`;
    return this.http.get<Talent[]>(url).pipe(
      catchError(this.handleError<Talent[]>(`getTalents id=${id}`))
    );
  }

}