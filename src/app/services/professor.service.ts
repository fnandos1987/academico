import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(public http: HttpClient) { }

  getProfessores(page) {
    return this.http.get(`${SERVER_URL}/professor/listar/${page}`);
  }

}
