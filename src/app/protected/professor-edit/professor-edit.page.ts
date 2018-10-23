import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.page.html',
  styleUrls: ['./professor-edit.page.scss'],
})
export class ProfessorEditPage implements OnInit {

  private form: FormGroup;
  constructor(private professorService: ProfessorService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      data_nascto: ['', Validators.required],
      foto: [],
      curriculo: ['', Validators.required],
      status : []
    });

    if (this.professorService.id != null) {
      this.carrega(this.professorService.id);
    }
  }

  carrega(id) {
    this.professorService.getProfessor(id).subscribe(obj => {
      this.form.setValue(obj);
    })
  }

}
