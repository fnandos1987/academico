import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AButtonComponent } from './a-button.component';

describe('AButtonComponent', () => {
  let component: AButtonComponent;
  let fixture: ComponentFixture<AButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
