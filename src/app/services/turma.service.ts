import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  id: any;
  constructor(public http: HttpClient) { }

  getTurmas(page) {
    return this.http.get(`${SERVER_URL}/turma/listar/${page}`);
  }

  getTurmasBusca(nome) {
    return this.http.get(`${SERVER_URL}/turma/buscar/${nome}`);
  }

  getTurma(id) {
    return this.http.get(`${SERVER_URL}/turma/${id}`);
  }
}
