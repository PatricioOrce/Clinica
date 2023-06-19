import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaListaComponent } from './especialista-lista.component';

describe('EspecialistaListaComponent', () => {
  let component: EspecialistaListaComponent;
  let fixture: ComponentFixture<EspecialistaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
