import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite, public http: HttpClient) { }

  public getDB() {
    return this.sqlite.create({
      name: 'academico.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        this.createTables(db);

      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS professor ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR (100) NOT NULL, data_nascto DATE NOT NULL, foto VARCHAR (20), curriculo TEXT NOT NULL, status BOOLEAN NOT NULL)']      
    ])
      .then(() => console.log('Tabela criada'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }
}
