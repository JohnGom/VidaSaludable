import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJornadaComponent } from './update-jornada.component';

describe('UpdateJornadaComponent', () => {
  let component: UpdateJornadaComponent;
  let fixture: ComponentFixture<UpdateJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
