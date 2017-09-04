import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJornadaComponent } from './new-jornada.component';

describe('NewJornadaComponent', () => {
  let component: NewJornadaComponent;
  let fixture: ComponentFixture<NewJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
