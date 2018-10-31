import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { Router } from '@angular/router';
import { ProfesorsqlService } from '../../database/profesorsql.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {

  professores;
  page;

  constructor(private profDb: ProfesorsqlService,
              private professorService: ProfessorService,
              private router: Router) { }

  ngOnInit() {
    this.onLoadListaProfessores();
  }

  onLoadListaProfessores() {
    this.page = 0;
    this.professores = [];
    this.getProfessores();
  }

  novoProfessor() {
    this.router.navigate(['protected', 'professor-new']);
  }

  showProfessorDetail(id) {
    this.profDb.id = id;
    this.router.navigate(['protected', 'professor-detail']);
  }

  doInfinite(event) {
    setTimeout(() => {
      this.page += 1;
      this.getProfessores();
      event.target.complete();
    }, 500);
  }

  onInputSearch(event) {
    const val = event.target.value;    
    if (val && val.trim() != '') {
      this.profDb.getByName(val)
        .then((data: any[]) => {
          this.professores = [];
          this.professores = data;
        })
    } else {
      this.onLoadListaProfessores();
    }
  }

  getProfessores() {
    this.profDb.getPagedList(this.page)
    .then((data) =>{
      this.professores = data;
    });
  }

}
