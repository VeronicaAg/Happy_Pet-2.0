import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFuncionarioComponent } from './crear-funcionario.component';

describe('CrearFuncionarioComponent', () => {
  let component: CrearFuncionarioComponent;
  let fixture: ComponentFixture<CrearFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
