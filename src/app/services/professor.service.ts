import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  id: number;
  constructor(public http: HttpClient) { }

  private handleError() {
    return throwError('Aparentemente estamos com um problema de comunicação com o servidor. Tente novamente mais tarde');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private getProfessorAsObject(obj) {
    return { professor: obj };
  }

  list(): Observable<any> {
    return this.http.get(`${SERVER_URL}/professor`).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  insert(professor) {
    return this.http.post(`${SERVER_URL}/professor/novo`, this.getProfessorAsObject(professor))
      .toPromise()
      .catch(() => {
        this.handleError();
      });
  }

  update(professor) {
    return this.http.put(`${SERVER_URL}/professor/alterar`, this.getProfessorAsObject(professor))
      .toPromise()
      .catch(() => {
        this.handleError();
      });
  }

  delete(id) {
    return this.http.delete(`${SERVER_URL}/professor/delete/${id}`)
      .toPromise()
      .catch(() => {
        this.handleError();
      });
  }

}
