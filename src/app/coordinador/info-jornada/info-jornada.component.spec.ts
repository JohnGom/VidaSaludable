import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJornadaComponent } from './info-jornada.component';

describe('InfoJornadaComponent', () => {
  let component: InfoJornadaComponent;
  let fixture: ComponentFixture<InfoJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
