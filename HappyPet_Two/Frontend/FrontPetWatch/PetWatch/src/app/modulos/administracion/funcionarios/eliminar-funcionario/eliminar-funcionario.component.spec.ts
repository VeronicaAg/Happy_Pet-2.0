import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarFuncionarioComponent } from './eliminar-funcionario.component';

describe('EliminarFuncionarioComponent', () => {
  let component: EliminarFuncionarioComponent;
  let fixture: ComponentFixture<EliminarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
