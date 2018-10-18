import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaEditPage } from './turma-edit.page';

describe('TurmaEditPage', () => {
  let component: TurmaEditPage;
  let fixture: ComponentFixture<TurmaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
