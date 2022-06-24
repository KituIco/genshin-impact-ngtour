import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cons, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Artifact } from './artifact';


@Injectable({ providedIn: 'root' })
export class ArtifactService {
  private artifactsUrl = 'https://impact.moe/api/artifacts';  // URL to web api

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

  /** GET Artifacts from the server */
  getArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(this.artifactsUrl)
      .pipe(
        catchError(this.handleError<Artifact[]>('getArtifacts', []))
      );
  }

  /** GET Artifact by id. Return `undefined` when id not found */
  getArtifactNo404<Data>(id: string): Observable<Artifact> {
    const url = `${this.artifactsUrl}/?id=${id}`;
    return this.http.get<Artifact[]>(url)
      .pipe(
        map(artifacts => artifacts[0]), // returns a {0|1} element array
        catchError(this.handleError<Artifact>(`getArtifact id=${id}`))
      );
  }

  /** GET weapoin by id. Will 404 if id not found */
  getArtifact(id: string): Observable<Artifact> {
    const url = `${this.artifactsUrl}/${id}`;
    return this.http.get<Artifact>(url).pipe(
      catchError(this.handleError<Artifact>(`getArtifact id=${id}`))
    );
  }
}
