import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFuncionarioComponent } from './buscar-funcionario.component';

describe('BuscarFuncionarioComponent', () => {
  let component: BuscarFuncionarioComponent;
  let fixture: ComponentFixture<BuscarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
