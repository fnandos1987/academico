import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { Professor } from '../model/professor';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from '../../environments/environment';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfesorsqlService {

  id: any;
  constructor(private sqlite: SqliteService) { }

  private getNextId() {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'select max(id) + 1 as id from professor';

        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              return data.rows.item(0).id;
            }
          })
          .catch((e) => console.error(e));
      })
  }

  insert(professor) {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        if (professor.id == null) {
          professor.id = this.getNextId();
        }

        let sql = 'insert into professor (id, nome, data_nascto, foto, curriculo, status) values (?, ?, ?, ?, ?, ?)';
        let data = [professor.id, professor.nome, professor.data_nascto, professor.foto, professor.curriculo, professor.status ? 1 : 0];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  update(professor) {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'update professor set nome = ?, data_nascto = ?, curriculo = ?, status = ? where id = ?';
        let data = [professor.nome, professor.data_nascto, professor.curriculo, professor.status, professor.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  updateFoto(id, foto) {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'update professor set foto = ? where id = ?';
        let data = [foto, id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  remove(id: number) {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'delete from professor where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  getPagedList(page: number) {
    return new Promise((resolve, reject) => {
      this.sqlite.getDb()
        .then((db: SQLiteObject) => {
          let sql = 'select * from professor limit ? offset ?';
          let start = page * 10;
          let data = [10, start];
          let professores: any[] = [];

          db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                  professores.push(data.rows.item(i));
                }
              }
            })
            .catch((e) => console.error(e));
          resolve(professores);
        })
        .catch(err => { reject([]); });
    });
  }

  getById(id: number) {
    return this.sqlite.getDb()
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
              professor.foto = item.foto == null ? SERVER_URL + '/imgs/ghost_person.png' : item.foto;
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

  getByName(name: string) {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'select * from professor where nome like ?';
        let data = ['%' + name + '%'];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let professores: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                professores.push(data.rows.item(i));
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

  getAll() {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'select * from professor';

        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let professores: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                professores.push(data.rows.item(i));
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

  loadProfessores(professores) {
    for (let i in professores) {
      this.insert(professores[i]);
    }
  }

  limpaProfessores() {
    return this.sqlite.getDb()
      .then((db: SQLiteObject) => {
        let sql = 'delete from professor';

        return db.executeSql(sql, [])
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
