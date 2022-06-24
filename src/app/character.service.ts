import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cons, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Character } from './character';
import { Constellation } from './constellation';
import { Talent } from './talent';

@Injectable({ providedIn: 'root' })
export class CharacterService {

  private charactersUrl = 'https://impact.moe/api/characters';  // URL to web api

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
    return this.http.get<Character[]>(this.charactersUrl)
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

  /** GET hero by id. Will 404 if id not found */
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


  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //        this.log(`found heroes matching "${term}"`) :
  //        this.log(`no heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  // //////// Save methods //////////

  // /** POST: add a new hero to the server */
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
  //     tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }

  // /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;

  //   return this.http.delete<Hero>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }

  // /** PUT: update the hero on the server */
  // updateHero(hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  *
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  

}