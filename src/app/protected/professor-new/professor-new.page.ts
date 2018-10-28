import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-new',
  templateUrl: './professor-new.page.html',
  styleUrls: ['./professor-new.page.scss'],
})
export class ProfessorNewPage implements OnInit {

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
  }

  salvar() {
    
  }

}
