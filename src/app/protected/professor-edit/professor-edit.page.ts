import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { ProfesorsqlService } from '../../database/profesorsql.service';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.page.html',
  styleUrls: ['./professor-edit.page.scss'],
})
export class ProfessorEditPage implements OnInit {

  private form: FormGroup;
  constructor(private professorService: ProfessorService, 
              private profDb: ProfesorsqlService,
              private formBuilder: FormBuilder) { }

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
    this.profDb.update(this.form.value);    
  }

}
