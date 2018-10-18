import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-turma-edit',
  templateUrl: './turma-edit.page.html',
  styleUrls: ['./turma-edit.page.scss'],
})
export class TurmaEditPage implements OnInit {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      ementa: ['', Validators.required],
      dataIni: ['', Validators.required],      
      dataFim: ['', Validators.required]      
    });
  }

  ngOnInit() {
    //this.form.setValue({nome: "Turma", ementa: "Foi", dataIni: new Date(), dataFim: new Date()});
  }

  logForm(){
    console.log(this.form.value)
  }

}
