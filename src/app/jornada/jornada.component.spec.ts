import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadaActivaComponent } from './jornada.component';

describe('JornadaActivaComponent', () => {
  let component: JornadaActivaComponent;
  let fixture: ComponentFixture<JornadaActivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadaActivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
