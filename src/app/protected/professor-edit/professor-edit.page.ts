import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfesorsqlService } from '../../database/profesorsql.service';
import { ProfessorService } from '../../services/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.page.html',
  styleUrls: ['./professor-edit.page.scss'],
})
export class ProfessorEditPage implements OnInit {

  private form: FormGroup;
  constructor(private profDb: ProfesorsqlService,
              private professorServ: ProfessorService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      data_nascto: ['', Validators.required],
      foto: [],
      curriculo: ['', Validators.required],
      status : []
    });

    if (this.profDb.id != null) {
      this.carrega(this.profDb.id);
    }
  }

  async carrega(id) {
    await this.profDb.getById(id).then((data: any) => {
      this.form.setValue(data);
    });
  }

  salvar() {
    let professor = this.form.value
    this.profDb.update(professor);
    this.professorServ.update(professor);
    this.router.navigate(['protected', 'professor-detail']);
  }

}
