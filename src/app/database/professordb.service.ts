import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Professor } from '../model/professor';
import { SQLiteObject } from '@ionic-native/sqlite';
import { environment } from '../../environments/environment';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfessordbService {

  constructor(private dataBase: DatabaseService) { }

  insert(professor: Professor) {
    return this.dataBase.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into professor (nome, data_nascto, foto, curriculo, status) values (?, ?, ?, ?, ?)';
        let data = [professor.nome, professor.data_nascto, professor.foto, professor.curriculo, professor.status ? 1 : 0];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  update(professor: Professor) {
    return this.dataBase.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update professor set nome = ?, data_nascto = ?, curriculo = ?, status = ? where id = ?';
        let data = [professor.nome, professor.data_nascto, professor.curriculo, professor.status, professor.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  remove(id: number) {
    return this.dataBase.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from professor where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  getPagedList(page: number) {
    return this.dataBase.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from professor limit ? offset ?';
        let data = [10, page * 10];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let professores: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var professor = data.rows.item(i);
                professores.push(professor);
              }
              return professores;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  getById(id: number) {
    return this.dataBase.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from professor where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let professor = new Professor();
              professor.id = item.id;
              professor.nome = item.nome;
              professor.data_nascto = item.data_nascto;
              professor.foto = SERVER_URL+item.foto;
              professor.curriculo = item.curriculo;
              professor.status = item.status;
              return professor;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
