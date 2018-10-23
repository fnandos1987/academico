import { Component, OnInit } from '@angular/core';
import { Professor } from '../../model/professor';
import { ProfessorService } from '../../services/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {

  professores;
  page;

  constructor(private profService: ProfessorService, private router: Router) { }

  ngOnInit() {
    this.onLoadListaProfessores();
  }

  onLoadListaProfessores() {
    this.page = 0;
    this.professores = [];
    this.getProfessores();
  }

  novoProfessor() {
    
  }

  showProfessorDetail(id) {
    this.profService.id = id;
    this.router.navigate(['/protected/professor-detail']);
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
      this.profService.getProfessoresBusca(val)
        .subscribe(data => {
          this.professores = data;
        })
    } else {
      this.onLoadListaProfessores();
    }
  }

  getProfessores() {
    this.profService.getProfessores(this.page)
      .subscribe(data => {
        for (let i in data) {
          this.professores.push(data[i]);          
        }
      })
  }

}
