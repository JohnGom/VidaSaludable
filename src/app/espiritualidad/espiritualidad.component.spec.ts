import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspiritualidadComponent } from './espiritualidad.component';

describe('EspiritualidadComponent', () => {
  let component: EspiritualidadComponent;
  let fixture: ComponentFixture<EspiritualidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspiritualidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspiritualidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
