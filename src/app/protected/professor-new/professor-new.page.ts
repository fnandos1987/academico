import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { ProfesorsqlService } from '../../database/profesorsql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-new',
  templateUrl: './professor-new.page.html',
  styleUrls: ['./professor-new.page.scss'],
})
export class ProfessorNewPage implements OnInit {

  private form: FormGroup;
  constructor(private professorService: ProfessorService, 
              private profDb: ProfesorsqlService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      data_nascto: ['', Validators.required],
      foto: [],
      curriculo: ['', Validators.required],
      status : []
    });
  }

  salvar() {
    this.profDb.insert(this.form.value);
    this.router.navigate(['protected', 'professor']);
  }

}
