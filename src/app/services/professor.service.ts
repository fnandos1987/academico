import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  id: number;
  constructor(public http: HttpClient) { }

  list () {
    return this.http.get(`${SERVER_URL}/professor`);
  }

  getProfessores(page) {
    return this.http.get(`${SERVER_URL}/professor/listar/${page}`);
  }

  getProfessoresBusca(nome) {
    return this.http.get(`${SERVER_URL}/professor/buscar/${nome}`);
  }

  getProfessor(id) {
    return this.http.get(`${SERVER_URL}/professor/${id}`);
  }

}
