import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.page.html',
  styleUrls: ['./turma.page.scss'],
})
export class TurmaPage implements OnInit {

  turmas;
  page;

  constructor(private turmaService: TurmaService, private router: Router) { }

  ngOnInit() {
    this.onLoadTurmas();
  }

  onLoadTurmas() {
    this.page = 0;
    this.turmas = [];
    this.getTurmas();
  }

  doInfinite(event) {
    setTimeout(() => {
      this.page += 1;
      this.getTurmas();
      event.target.complete();
    }, 500);
  }

  onInputSearch(event) {
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.turmaService.getTurmasBusca(val)
        .subscribe(data => {
          this.turmas = data;
        })
    } else {
      this.onLoadTurmas();
    }
  }

  showClassDetail(id) {
    this.turmaService.id = id;
    this.router.navigate(['/protected/turma-detail']);
  }

  getTurmas() {
    this.turmaService.getTurmas(this.page)
      .subscribe(data => {
        for (let i in data) {
          this.turmas.push(data[i]);
        }
      })
  }

}
