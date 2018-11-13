import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private db: SQLiteObject;

  constructor(public platform: Platform, private sqlite: SQLite) { }

  private createDatabase(): Promise<SQLiteObject> {
    return this.platform.ready()
      .then((ok) => {

        return this.sqlite.create({
          name: 'academico.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.db = db;
          return db;
        }).catch((error: Error) => {
          console.log('Erro ao abrir ou criar a database: ', error);
          return Promise.reject(error.message || error);
        });

      });
  }

  getDb(newOpen?: boolean): Promise<SQLiteObject> {
    if (newOpen) { return this.createDatabase(); }
    return this.db ? Promise.resolve(this.db) : this.createDatabase();
  }

  createTables() {
    this.getDb().then((db: SQLiteObject) => {

      db.sqlBatch([
        ['CREATE TABLE IF NOT EXISTS professor ( id INTEGER PRIMARY KEY NOT NULL, nome VARCHAR (100) NOT NULL, data_nascto DATE NOT NULL, foto VARCHAR (20), curriculo TEXT NOT NULL, status BOOLEAN NOT NULL)']      
      ])
        .then(() => console.log('Tabela criada'))
        .catch(e => console.error('Erro ao criar as tabelas', e));
        
    });
  }

}
